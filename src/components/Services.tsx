import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PlusCircle, Download, Trash2, Home, Building, Shield, Scale, Headphones, ChevronRight, GitBranch, Zap } from "lucide-react";
import { 
  getInitialServicesData, 
  downloadServicesData, 
  type Question, 
  type Service, 
  type ServiceCategory, 
  type ServicesData,
  type ConditionalRule
} from "@/utils/servicesData";

const Services = () => {
  const [servicesData, setServicesData] = useState<ServicesData>(() => getInitialServicesData());
  
  // Check if we're in development mode - only allow editing in development
  const isEditable = import.meta.env.DEV;

  const [selectedService, setSelectedService] = useState<{ categoryId: string; serviceId: string } | null>(null);
  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({
    text: '',
    type: 'text',
    required: false,
    order: 0
  });
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'flow'>('list');

  const addQuestion = () => {
    if (!selectedService || !newQuestion.text) return;

    // Find the service to get next order number
    const currentService = servicesData.serviceCategories
      .find(cat => cat.id === selectedService.categoryId)
      ?.services.find(svc => svc.id === selectedService.serviceId);
    
    const nextOrder = currentService ? Math.max(0, ...currentService.questions.map(q => q.order)) + 1 : 1;

    const questionId = Date.now().toString();
    const question: Question = {
      id: questionId,
      text: newQuestion.text,
      type: newQuestion.type || 'text',
      options: newQuestion.options,
      required: newQuestion.required || false,
      order: nextOrder,
      conditional: newQuestion.conditional
    };

    setServicesData(prev => ({
      ...prev,
      serviceCategories: prev.serviceCategories.map(category => 
        category.id === selectedService.categoryId
          ? {
              ...category,
              services: category.services.map(service =>
                service.id === selectedService.serviceId
                  ? { ...service, questions: [...service.questions, question] }
                  : service
              )
            }
          : category
      )
    }));

    setNewQuestion({ text: '', type: 'text', required: false, order: 0 });
    setIsAddingQuestion(false);
  };

  const removeQuestion = (categoryId: string, serviceId: string, questionId: string) => {
    setServicesData(prev => ({
      ...prev,
      serviceCategories: prev.serviceCategories.map(category =>
        category.id === categoryId
          ? {
              ...category,
              services: category.services.map(service =>
                service.id === serviceId
                  ? { ...service, questions: service.questions.filter(q => q.id !== questionId) }
                  : service
              )
            }
          : category
      )
    }));
  };

  const toggleServiceOffering = (categoryId: string, serviceId: string) => {
    setServicesData(prev => ({
      ...prev,
      serviceCategories: prev.serviceCategories.map(category =>
        category.id === categoryId
          ? {
              ...category,
              services: category.services.map(service =>
                service.id === serviceId
                  ? { ...service, isCurrentlyOffering: !service.isCurrentlyOffering }
                  : service
              )
            }
          : category
      )
    }));
  };

  // Build question flow tree
  const buildQuestionFlow = (questions: Question[]) => {
    const sortedQuestions = [...questions].sort((a, b) => a.order - b.order);
    const rootQuestions = sortedQuestions.filter(q => !q.conditional);
    const conditionalQuestions = sortedQuestions.filter(q => q.conditional);

    const buildTree = (parentId: string | null = null, depth = 0): any[] => {
      const children = conditionalQuestions.filter(q => 
        q.conditional?.parentQuestionId === parentId
      );

      return children.map(question => ({
        question,
        depth,
        children: buildTree(question.id, depth + 1)
      }));
    };

    return rootQuestions.map(question => ({
      question,
      depth: 0,
      children: buildTree(question.id, 1)
    }));
  };

  // Render question flow tree
  const renderQuestionFlow = (flowTree: any[], categoryId: string, serviceId: string, questions: Question[]) => {
    const renderNode = (node: any, isLast = false, prefix = '') => {
      const { question, depth, children } = node;
      const hasChildren = children && children.length > 0;
      
      return (
        <div key={question.id} className="relative">
          {/* Question Node */}
          <div className={`flex items-start gap-3 p-3 rounded-lg mb-2 ${
            depth === 0 ? 'bg-blue-50 border-l-4 border-l-blue-500' : 
            'bg-gray-50 border-l-4 border-l-gray-300 ml-6'
          }`}>
            {/* Depth Indicator */}
            {depth > 0 && (
              <div className="flex items-center text-gray-400">
                <ChevronRight className="w-4 h-4" />
              </div>
            )}
            
            {/* Question Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono bg-white px-2 py-1 rounded border">
                  #{question.order}
                </span>
                {depth === 0 ? (
                  <Zap className="w-4 h-4 text-blue-500" />
                ) : (
                  <GitBranch className="w-4 h-4 text-gray-500" />
                )}
                {question.conditional && (
                  <Badge variant="outline" className="text-xs bg-orange-50 text-orange-600 border-orange-200">
                    If condition met
                  </Badge>
                )}
                {question.required && (
                  <Badge variant="destructive" className="text-xs">
                    Required
                  </Badge>
                )}
              </div>
              
              <p className="font-medium text-slate-700 font-inter mb-1">
                {question.text}
              </p>
              
              {/* Question Type & Options */}
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs">
                  {question.type}
                </Badge>
                {question.options && question.options.length > 0 && (
                  <Badge variant="default" className="text-xs bg-green-100 text-green-700">
                    {question.options.length} options
                  </Badge>
                )}
              </div>

              {/* Show Options */}
              {question.options && question.options.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {question.options.map((option, index) => (
                    <span key={index} className="text-xs bg-white px-2 py-1 rounded border text-gray-600">
                      {option}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Conditional Logic Display */}
              {question.conditional && (
                <div className="p-2 bg-orange-50 rounded text-xs text-orange-700 font-inter mb-2">
                  <strong>Shows when:</strong> Question #
                  {questions.find(q => q.id === question.conditional!.parentQuestionId)?.order || '?'} {' '}
                  {question.conditional.operator === 'equals' ? '=' : 
                   question.conditional.operator === 'contains' ? 'contains' : '≠'} {' '}
                  "{Array.isArray(question.conditional.parentAnswerValue) 
                    ? question.conditional.parentAnswerValue.join(', ') 
                    : question.conditional.parentAnswerValue}"
                </div>
              )}
            </div>
            
            {/* Actions */}
            {isEditable && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeQuestion(categoryId, serviceId, question.id)}
                className="text-red-500 hover:text-red-700 self-start"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          {/* Children with connecting lines */}
          {hasChildren && (
            <div className="ml-6 border-l-2 border-gray-200 pl-4">
              {children.map((child: any, index: number) => 
                renderNode(child, index === children.length - 1, prefix + '  ')
              )}
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="space-y-2">
        {flowTree.map((node, index) => 
          renderNode(node, index === flowTree.length - 1)
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 font-degular">
          Our Services
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto font-inter">
          Comprehensive building inspection and advisory services to protect your property investment and ensure compliance.
        </p>
      </div>

      <div className="space-y-8">
        {/* Export Data Button - Only show in development */}
        {isEditable && (
          <div className="flex justify-end mb-4">
            <Button
              onClick={() => downloadServicesData(servicesData)}
              variant="outline"
              className="font-inter"
            >
              <Download className="w-4 h-4 mr-2" />
              Export Services Data
            </Button>
          </div>
        )}

        {servicesData.serviceCategories.map((category) => {
          const IconComponent = (() => {
            switch (category.icon) {
              case 'Home': return Home;
              case 'Building': return Building;
              case 'Shield': return Shield;
              case 'Scale': return Scale;
              case 'Headphones': return Headphones;
              default: return Home;
            }
          })();
          return (
            <Card key={category.id} className="border-l-4 border-l-[#0b487b]">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#0b487b] rounded-lg flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-2xl font-bold text-slate-800 mb-2 font-degular">
                      {category.title}
                    </CardTitle>
                    <CardDescription className="text-slate-600 font-inter">
                      {category.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.services.map((service) => (
                    <AccordionItem key={service.id} value={service.id}>
                      <AccordionTrigger className="text-left hover:no-underline">
                        <div className="flex items-center justify-between w-full mr-4">
                          <div className="flex items-center gap-3">
                            <span className={`font-medium font-inter ${service.isCurrentlyOffering ? 'text-slate-700' : 'text-slate-400'}`}>
                              {service.name}
                            </span>
                            {service.isCurrentlyOffering ? (
                              <Badge variant="default" className="bg-green-100 text-green-700 border-green-200">
                                Currently Offering
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="bg-orange-100 text-orange-700 border-orange-200">
                                Not Offering
                              </Badge>
                            )}
                          </div>
                          <Badge variant="secondary" className="ml-2">
                            {service.questions.length} questions
                          </Badge>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4 pt-4">
                          {/* Service Offering Toggle - Only editable in development */}
                          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div>
                              <h4 className="font-medium text-slate-700 font-inter">Service Status</h4>
                              <p className="text-sm text-slate-500 font-inter">
                                {service.isCurrentlyOffering 
                                  ? "This service is currently being offered to clients" 
                                  : "This service is not currently available"
                                }
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Label htmlFor={`offering-${service.id}`} className="text-sm font-inter">
                                {service.isCurrentlyOffering ? 'Offering' : 'Not Offering'}
                              </Label>
                              <Switch
                                id={`offering-${service.id}`}
                                checked={service.isCurrentlyOffering}
                                onCheckedChange={isEditable ? () => toggleServiceOffering(category.id, service.id) : undefined}
                                disabled={!isEditable}
                              />
                            </div>
                          </div>

                          {service.description && (
                            <p className="text-slate-600 font-inter">{service.description}</p>
                          )}
                          
                          {/* Questions Section */}
                          {service.questions.length > 0 && (
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium text-slate-700 font-inter">Service Questions:</h4>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant={viewMode === 'list' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setViewMode('list')}
                                    className="text-xs font-inter"
                                  >
                                    List View
                                  </Button>
                                  <Button
                                    variant={viewMode === 'flow' ? 'default' : 'outline'}
                                    size="sm"
                                    onClick={() => setViewMode('flow')}
                                    className="text-xs font-inter"
                                  >
                                    <GitBranch className="w-3 h-3 mr-1" />
                                    Flow View
                                  </Button>
                                </div>
                              </div>

                              {viewMode === 'list' ? (
                                // Original List View
                                <div className="space-y-2">
                                  {service.questions
                                    .sort((a, b) => a.order - b.order)
                                    .map((question) => (
                                <div key={question.id} className="flex items-start justify-between p-3 bg-slate-50 rounded-lg">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="text-xs text-slate-400 font-mono">#{question.order}</span>
                                      {question.conditional && (
                                        <Badge variant="outline" className="text-xs bg-blue-50 text-blue-600 border-blue-200">
                                          Conditional
                                        </Badge>
                                      )}
                                    </div>
                                    <p className="font-medium text-slate-700 font-inter">{question.text}</p>
                                    {question.conditional && (
                                      <div className="mt-1 p-2 bg-blue-50 rounded text-xs text-blue-700 font-inter">
                                        <strong>Shows when:</strong> Question #{service.questions.find(q => q.id === question.conditional!.parentQuestionId)?.order || '?'} {question.conditional.operator === 'equals' ? '=' : question.conditional.operator === 'contains' ? 'contains' : '≠'} "{Array.isArray(question.conditional.parentAnswerValue) ? question.conditional.parentAnswerValue.join(', ') : question.conditional.parentAnswerValue}"
                                      </div>
                                    )}
                                    {question.options && question.options.length > 0 && (
                                      <div className="mt-2">
                                        <p className="text-xs text-slate-500 font-inter mb-1">Options:</p>
                                        <div className="flex flex-wrap gap-1">
                                          {question.options.map((option, index) => (
                                            <Badge key={index} variant="secondary" className="text-xs">
                                              {option}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                    <div className="flex items-center gap-2 mt-2">
                                      <Badge variant="outline" className="text-xs">
                                        {question.type}
                                      </Badge>
                                      {question.required && (
                                        <Badge variant="destructive" className="text-xs">
                                          Required
                                        </Badge>
                                      )}
                                      {question.options && question.options.length > 0 && (
                                        <Badge variant="default" className="text-xs bg-blue-100 text-blue-700">
                                          {question.options.length} options
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                  {isEditable && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeQuestion(category.id, service.id, question.id)}
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  )}
                                </div>
                                    ))}
                                </div>
                              ) : (
                                // Flow View
                                renderQuestionFlow(buildQuestionFlow(service.questions), category.id, service.id, service.questions)
                              )}
                            </div>
                          )}

                          {/* Add Question Button - Only show in development */}
                          {isEditable && (
                            <Dialog open={isAddingQuestion && selectedService?.categoryId === category.id && selectedService?.serviceId === service.id} onOpenChange={setIsAddingQuestion}>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedService({ categoryId: category.id, serviceId: service.id });
                                    setIsAddingQuestion(true);
                                  }}
                                  className="font-inter"
                                >
                                  <PlusCircle className="w-4 h-4 mr-2" />
                                  Add Question
                                </Button>
                              </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle className="font-degular">Add Question to {service.name}</DialogTitle>
                                <DialogDescription className="font-inter">
                                  Create a new question that will be asked for this service.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="question-text" className="font-inter">Question Text</Label>
                                  <Textarea
                                    id="question-text"
                                    placeholder="Enter your question..."
                                    value={newQuestion.text}
                                    onChange={(e) => setNewQuestion(prev => ({ ...prev, text: e.target.value }))}
                                    className="font-inter"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="question-type" className="font-inter">Question Type</Label>
                                  <select
                                    id="question-type"
                                    value={newQuestion.type}
                                    onChange={(e) => setNewQuestion(prev => ({ ...prev, type: e.target.value as Question['type'] }))}
                                    className="w-full p-2 border border-gray-300 rounded-md font-inter"
                                  >
                                    <option value="text">Text Input</option>
                                    <option value="textarea">Text Area</option>
                                    <option value="select">Select Dropdown</option>
                                    <option value="checkbox">Checkbox</option>
                                  </select>
                                </div>
                                {(newQuestion.type === 'select' || newQuestion.type === 'checkbox') && (
                                  <div>
                                    <Label htmlFor="question-options" className="font-inter">
                                      {newQuestion.type === 'select' ? 'Dropdown Options' : 'Checkbox Options'} (comma-separated)
                                    </Label>
                                    <Textarea
                                      id="question-options"
                                      placeholder={newQuestion.type === 'select' 
                                        ? "Option 1, Option 2, Option 3" 
                                        : "Option A, Option B, Option C"
                                      }
                                      onChange={(e) => setNewQuestion(prev => ({ 
                                        ...prev, 
                                        options: e.target.value.split(',').map(opt => opt.trim()).filter(Boolean)
                                      }))}
                                      className="font-inter min-h-[80px]"
                                      rows={3}
                                    />
                                    <p className="text-sm text-slate-500 mt-1 font-inter">
                                      {newQuestion.type === 'select' 
                                        ? 'Users will select one option from the dropdown list'
                                        : 'Users can select multiple options from checkboxes'
                                      }
                                    </p>
                                  </div>
                                )}
                                {/* Conditional Logic Section */}
                                <div className="border-t pt-4">
                                  <Label className="font-inter text-sm font-medium">Conditional Logic (Optional)</Label>
                                  <p className="text-xs text-slate-500 mb-3 font-inter">Make this question appear only when a previous question has a specific answer</p>
                                  
                                  <div className="flex items-center space-x-2 mb-3">
                                    <input
                                      type="checkbox"
                                      id="question-conditional"
                                      checked={!!newQuestion.conditional}
                                      onChange={(e) => {
                                        if (e.target.checked) {
                                          setNewQuestion(prev => ({ 
                                            ...prev, 
                                            conditional: { 
                                              parentQuestionId: '', 
                                              parentAnswerValue: '', 
                                              operator: 'equals' 
                                            } 
                                          }));
                                        } else {
                                          setNewQuestion(prev => ({ ...prev, conditional: undefined }));
                                        }
                                      }}
                                    />
                                    <Label htmlFor="question-conditional" className="font-inter">Make this a conditional question</Label>
                                  </div>

                                  {newQuestion.conditional && (
                                    <div className="space-y-3 p-3 bg-blue-50 rounded border-blue-200 border">
                                      <div>
                                        <Label className="font-inter text-sm">Show this question when:</Label>
                                        <select
                                          value={newQuestion.conditional.parentQuestionId}
                                          onChange={(e) => setNewQuestion(prev => ({ 
                                            ...prev, 
                                            conditional: { ...prev.conditional!, parentQuestionId: e.target.value }
                                          }))}
                                          className="w-full p-2 border border-gray-300 rounded-md font-inter mt-1"
                                        >
                                          <option value="">Select a previous question...</option>
                                          {servicesData.serviceCategories
                                            .find(cat => cat.id === selectedService?.categoryId)
                                            ?.services.find(svc => svc.id === selectedService?.serviceId)
                                            ?.questions.sort((a, b) => a.order - b.order)
                                            .map(q => (
                                              <option key={q.id} value={q.id}>
                                                #{q.order} - {q.text.substring(0, 50)}...
                                              </option>
                                            ))}
                                        </select>
                                      </div>
                                      
                                      <div className="flex gap-2">
                                        <select
                                          value={newQuestion.conditional.operator}
                                          onChange={(e) => setNewQuestion(prev => ({ 
                                            ...prev, 
                                            conditional: { ...prev.conditional!, operator: e.target.value as ConditionalRule['operator'] }
                                          }))}
                                          className="p-2 border border-gray-300 rounded-md font-inter"
                                        >
                                          <option value="equals">equals</option>
                                          <option value="contains">contains</option>
                                          <option value="not_equals">does not equal</option>
                                        </select>
                                        
                                        {(() => {
                                          // Find the parent question to get its options
                                          const parentQuestion = servicesData.serviceCategories
                                            .find(cat => cat.id === selectedService?.categoryId)
                                            ?.services.find(svc => svc.id === selectedService?.serviceId)
                                            ?.questions.find(q => q.id === newQuestion.conditional?.parentQuestionId);
                                          
                                          // If parent question has options (select/checkbox), show dropdown
                                          if (parentQuestion && parentQuestion.options && parentQuestion.options.length > 0) {
                                            return (
                                              <select
                                                value={Array.isArray(newQuestion.conditional.parentAnswerValue) 
                                                  ? newQuestion.conditional.parentAnswerValue[0] || ''
                                                  : newQuestion.conditional.parentAnswerValue}
                                                onChange={(e) => setNewQuestion(prev => ({ 
                                                  ...prev, 
                                                  conditional: { ...prev.conditional!, parentAnswerValue: e.target.value }
                                                }))}
                                                className="flex-1 p-2 border border-gray-300 rounded-md font-inter"
                                              >
                                                <option value="">Select an option...</option>
                                                {parentQuestion.options.map((option, index) => (
                                                  <option key={index} value={option}>
                                                    {option}
                                                  </option>
                                                ))}
                                              </select>
                                            );
                                          } else {
                                            // For text/textarea questions, show input field
                                            return (
                                              <Input
                                                placeholder="Answer value..."
                                                value={Array.isArray(newQuestion.conditional.parentAnswerValue) 
                                                  ? newQuestion.conditional.parentAnswerValue.join(', ') 
                                                  : newQuestion.conditional.parentAnswerValue}
                                                onChange={(e) => setNewQuestion(prev => ({ 
                                                  ...prev, 
                                                  conditional: { ...prev.conditional!, parentAnswerValue: e.target.value }
                                                }))}
                                                className="font-inter flex-1"
                                              />
                                            );
                                          }
                                        })()}
                                      </div>
                                      
                                      {(() => {
                                        const parentQuestion = servicesData.serviceCategories
                                          .find(cat => cat.id === selectedService?.categoryId)
                                          ?.services.find(svc => svc.id === selectedService?.serviceId)
                                          ?.questions.find(q => q.id === newQuestion.conditional?.parentQuestionId);
                                        
                                        if (parentQuestion) {
                                          return (
                                            <div className="text-xs text-blue-600 font-inter">
                                              <p>This question will only appear when the selected question's answer matches the condition above.</p>
                                              <p className="mt-1">
                                                <strong>Parent question type:</strong> {parentQuestion.type}
                                                {parentQuestion.options && parentQuestion.options.length > 0 && (
                                                  <span> (has {parentQuestion.options.length} predefined options)</span>
                                                )}
                                              </p>
                                            </div>
                                          );
                                        } else {
                                          return (
                                            <p className="text-xs text-blue-600 font-inter">
                                              This question will only appear when the selected question's answer matches the condition above.
                                            </p>
                                          );
                                        }
                                      })()}
                                    </div>
                                  )}
                                </div>

                                <div className="flex items-center space-x-2">
                                  <input
                                    type="checkbox"
                                    id="question-required"
                                    checked={newQuestion.required}
                                    onChange={(e) => setNewQuestion(prev => ({ ...prev, required: e.target.checked }))}
                                  />
                                  <Label htmlFor="question-required" className="font-inter">Required field</Label>
                                </div>
                                <div className="flex justify-end space-x-2">
                                  <Button variant="outline" onClick={() => setIsAddingQuestion(false)} className="font-inter">
                                    Cancel
                                  </Button>
                                  <Button onClick={addQuestion} className="bg-[#0b487b] hover:bg-[#094071] font-inter">
                                    Add Question
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Services; 