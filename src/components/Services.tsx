import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PlusCircle, Download, Trash2, Home, Building, Shield, Scale, Headphones, ChevronRight, GitBranch, Zap, Edit } from "lucide-react";
import { 
  getInitialServicesDataWithPersistence, 
  downloadServicesData, 
  saveToFile,
  type Question, 
  type Service, 
  type ServiceCategory, 
  type ServicesData,
  type ConditionalRule
} from "@/utils/servicesData";

const Services = () => {
  const [servicesData, setServicesData] = useState<ServicesData>(() => getInitialServicesDataWithPersistence());
  
  // Check if we're in development mode - only allow editing in development
  const isEditable = import.meta.env.DEV;

  // Auto-save to file whenever data changes
  useEffect(() => {
    if (isEditable) {
      saveToFile(servicesData);
    }
  }, [servicesData, isEditable]);

  const [selectedService, setSelectedService] = useState<{ categoryId: string; serviceId: string } | null>(null);
  const [newQuestion, setNewQuestion] = useState<Partial<Question>>({
    text: '',
    type: 'text',
    required: false,
    order: 0
  });
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'flow'>('list');
  const [copyFromService, setCopyFromService] = useState<{ categoryId: string; serviceId: string } | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<{ categoryId: string; serviceId: string; questionId: string } | null>(null);
  const [editQuestionData, setEditQuestionData] = useState<Partial<Question>>({});

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

  const updateQuestion = () => {
    if (!editingQuestion || !editQuestionData.text) return;

    setServicesData(prev => ({
      ...prev,
      serviceCategories: prev.serviceCategories.map(category => 
        category.id === editingQuestion.categoryId
          ? {
              ...category,
              services: category.services.map(service =>
                service.id === editingQuestion.serviceId
                  ? { 
                      ...service, 
                      questions: service.questions.map(question =>
                        question.id === editingQuestion.questionId
                          ? { 
                              ...question, 
                              text: editQuestionData.text || question.text,
                              type: editQuestionData.type || question.type,
                              options: editQuestionData.options || question.options,
                              required: editQuestionData.required !== undefined ? editQuestionData.required : question.required
                            }
                          : question
                      )
                    }
                  : service
              )
            }
          : category
      )
    }));

    setEditingQuestion(null);
    setEditQuestionData({});
  };

  const startEditingQuestion = (categoryId: string, serviceId: string, question: Question) => {
    setEditingQuestion({ categoryId, serviceId, questionId: question.id });
    setEditQuestionData({
      text: question.text,
      type: question.type,
      options: question.options,
      required: question.required
    });
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

  const copyQuestionsFromService = () => {
    if (!selectedService || !copyFromService) return;

    // Find the source service
    const sourceService = servicesData.serviceCategories
      .find(cat => cat.id === copyFromService.categoryId)
      ?.services.find(svc => svc.id === copyFromService.serviceId);

    if (!sourceService || sourceService.questions.length === 0) return;

    // Copy questions with new IDs and updated order numbers
    const copiedQuestions: Question[] = sourceService.questions.map((question, index) => ({
      ...question,
      id: `${Date.now()}_${index}`, // Generate new unique ID
      order: index + 1, // Reset order starting from 1
      // Reset conditional logic as it might reference questions that don't exist in target service
      conditional: undefined
    }));

    setServicesData(prev => ({
      ...prev,
      serviceCategories: prev.serviceCategories.map(category => 
        category.id === selectedService.categoryId
          ? {
              ...category,
              services: category.services.map(service =>
                service.id === selectedService.serviceId
                  ? { ...service, questions: copiedQuestions } // Replace all questions
                  : service
              )
            }
          : category
      )
    }));

    setCopyFromService(null);
  };

  // Get all services with questions for the copy dropdown
  const getServicesWithQuestions = () => {
    const servicesWithQuestions: Array<{
      categoryId: string;
      categoryTitle: string;
      serviceId: string;
      serviceName: string;
      questionCount: number;
    }> = [];

    servicesData.serviceCategories.forEach(category => {
      category.services.forEach(service => {
        if (service.questions.length > 0) {
          servicesWithQuestions.push({
            categoryId: category.id,
            categoryTitle: category.title,
            serviceId: service.id,
            serviceName: service.name,
            questionCount: service.questions.length
          });
        }
      });
    });

    return servicesWithQuestions;
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
              onClick={() => downloadServicesData(servicesData, 'services-backup.json')}
              variant="outline"
              className="font-inter"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Backup
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
                                    <div className="flex gap-1">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => startEditingQuestion(category.id, service.id, question)}
                                        className="text-blue-500 hover:text-blue-700"
                                      >
                                        <Edit className="w-4 h-4" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removeQuestion(category.id, service.id, question.id)}
                                        className="text-red-500 hover:text-red-700"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </div>
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
                            <div className="flex gap-2">
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
                               
                            {/* Copy Questions Dialog */}
                            <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      setSelectedService({ categoryId: category.id, serviceId: service.id });
                                    }}
                                    className="font-inter"
                                  >
                                    Copy Questions From
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle className="font-degular">Copy Questions to {service.name}</DialogTitle>
                                    <DialogDescription className="font-inter">
                                      Select a service to copy all questions from. This will replace any existing questions.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <Label className="font-inter">Questions are the same as:</Label>
                                      <select
                                        value={copyFromService ? `${copyFromService.categoryId}:${copyFromService.serviceId}` : ''}
                                        onChange={(e) => {
                                          if (e.target.value) {
                                            const [categoryId, serviceId] = e.target.value.split(':');
                                            setCopyFromService({ categoryId, serviceId });
                                          } else {
                                            setCopyFromService(null);
                                          }
                                        }}
                                        className="w-full p-2 border border-gray-300 rounded-md font-inter mt-2"
                                      >
                                        <option value="">Select a service...</option>
                                        {getServicesWithQuestions()
                                          .filter(svc => !(svc.categoryId === category.id && svc.serviceId === service.id))
                                          .map(svc => (
                                            <option key={`${svc.categoryId}:${svc.serviceId}`} value={`${svc.categoryId}:${svc.serviceId}`}>
                                              {svc.categoryTitle} → {svc.serviceName} ({svc.questionCount} questions)
                                            </option>
                                          ))}
                                      </select>
                                    </div>
                                    <div className="flex justify-end space-x-2">
                                      <DialogTrigger asChild>
                                        <Button variant="outline" className="font-inter">
                                          Cancel
                                        </Button>
                                      </DialogTrigger>
                                      <Button 
                                        onClick={() => {
                                          copyQuestionsFromService();
                                          setCopyFromService(null);
                                        }}
                                        disabled={!copyFromService}
                                        className="bg-[#0b487b] hover:bg-[#094071] font-inter"
                                      >
                                        Copy Questions
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>

                              {/* Edit Question Dialog */}
                              <Dialog open={editingQuestion?.categoryId === category.id && editingQuestion?.serviceId === service.id} onOpenChange={(open) => !open && setEditingQuestion(null)}>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle className="font-degular">Edit Question</DialogTitle>
                                    <DialogDescription className="font-inter">
                                      Modify the question details below.
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <div>
                                      <Label htmlFor="edit-question-text" className="font-inter">Question Text</Label>
                                      <Textarea
                                        id="edit-question-text"
                                        placeholder="Enter your question..."
                                        value={editQuestionData.text || ''}
                                        onChange={(e) => setEditQuestionData(prev => ({ ...prev, text: e.target.value }))}
                                        className="font-inter"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="edit-question-type" className="font-inter">Question Type</Label>
                                      <select
                                        id="edit-question-type"
                                        value={editQuestionData.type || 'text'}
                                        onChange={(e) => setEditQuestionData(prev => ({ ...prev, type: e.target.value as Question['type'] }))}
                                        className="w-full p-2 border border-gray-300 rounded-md font-inter"
                                      >
                                        <option value="text">Text Input</option>
                                        <option value="textarea">Text Area</option>
                                        <option value="select">Select Dropdown</option>
                                        <option value="checkbox">Checkbox</option>
                                      </select>
                                    </div>
                                    {(editQuestionData.type === 'select' || editQuestionData.type === 'checkbox') && (
                                      <div>
                                        <Label htmlFor="edit-question-options" className="font-inter">
                                          {editQuestionData.type === 'select' ? 'Dropdown Options' : 'Checkbox Options'} (comma-separated)
                                        </Label>
                                        <Textarea
                                          id="edit-question-options"
                                          placeholder={editQuestionData.type === 'select' 
                                            ? "Option 1, Option 2, Option 3" 
                                            : "Option A, Option B, Option C"
                                          }
                                          value={editQuestionData.options ? editQuestionData.options.join(', ') : ''}
                                          onChange={(e) => setEditQuestionData(prev => ({ 
                                            ...prev, 
                                            options: e.target.value.split(',').map(opt => opt.trim()).filter(Boolean)
                                          }))}
                                          className="font-inter min-h-[80px]"
                                          rows={3}
                                        />
                                        <p className="text-sm text-slate-500 mt-1 font-inter">
                                          {editQuestionData.type === 'select' 
                                            ? 'Users will select one option from the dropdown list'
                                            : 'Users can select multiple options from checkboxes'
                                          }
                                        </p>
                                      </div>
                                    )}
                                    <div className="flex items-center space-x-2">
                                      <input
                                        type="checkbox"
                                        id="edit-question-required"
                                        checked={editQuestionData.required || false}
                                        onChange={(e) => setEditQuestionData(prev => ({ ...prev, required: e.target.checked }))}
                                      />
                                      <Label htmlFor="edit-question-required" className="font-inter">Required field</Label>
                                    </div>
                                    <div className="flex justify-end space-x-2">
                                      <Button variant="outline" onClick={() => setEditingQuestion(null)} className="font-inter">
                                        Cancel
                                      </Button>
                                      <Button onClick={updateQuestion} className="bg-[#0b487b] hover:bg-[#094071] font-inter">
                                        Update Question
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
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