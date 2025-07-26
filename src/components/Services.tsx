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
import { PlusCircle, Download, Trash2, Home, Building, Shield, Scale, Headphones, ChevronRight, GitBranch, Zap, Edit, ChevronUp, ChevronDown } from "lucide-react";
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
    order: 0,
    conditional: undefined
  });
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'flow'>('list');
  const [copyFromService, setCopyFromService] = useState<{ categoryId: string; serviceId: string } | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<{ categoryId: string; serviceId: string; questionId: string } | null>(null);
  const [editQuestionData, setEditQuestionData] = useState<Partial<Question>>({});

  // Function to check for circular dependencies in conditional logic
  const wouldCreateCircularDependency = (childQuestionId: string, parentQuestionId: string, questions: Question[]): boolean => {
    if (childQuestionId === parentQuestionId) return true;
    
    // Find if the parent question is itself conditional to another question
    const parentQuestion = questions.find(q => q.id === parentQuestionId);
    if (!parentQuestion?.conditional) return false;
    
    // Recursively check if the child would eventually depend on itself
    return wouldCreateCircularDependency(childQuestionId, parentQuestion.conditional.parentQuestionId, questions);
  };

  const addQuestion = () => {
    if (!selectedService || !newQuestion.text) return;

    // Find the service to get next order number
    const currentService = servicesData.serviceCategories
      .find(cat => cat.id === selectedService.categoryId)
      ?.services.find(svc => svc.id === selectedService.serviceId);
    
    if (!currentService) return;

    // Validate conditional logic to prevent circular dependencies
    const questionId = Date.now().toString();
    if (newQuestion.conditional?.parentQuestionId) {
      if (wouldCreateCircularDependency(questionId, newQuestion.conditional.parentQuestionId, currentService.questions)) {
        alert('Error: This would create a circular dependency. Please select a different parent question.');
        return;
      }
    }
    
    const nextOrder = currentService ? Math.max(0, ...currentService.questions.map(q => q.order)) + 1 : 1;

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

    setNewQuestion({ text: '', type: 'text', required: false, order: 0, conditional: undefined });
    setIsAddingQuestion(false);
  };

  const updateQuestion = () => {
    if (!editingQuestion || !editQuestionData.text) return;

    // Find the current service for validation
    const currentService = servicesData.serviceCategories
      .find(cat => cat.id === editingQuestion.categoryId)
      ?.services.find(svc => svc.id === editingQuestion.serviceId);
    
    if (!currentService) return;

    // Validate conditional logic to prevent circular dependencies
    if (editQuestionData.conditional?.parentQuestionId) {
      if (wouldCreateCircularDependency(editingQuestion.questionId, editQuestionData.conditional.parentQuestionId, currentService.questions)) {
        alert('Error: This would create a circular dependency. Please select a different parent question.');
        return;
      }
    }

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
                              required: editQuestionData.required !== undefined ? editQuestionData.required : question.required,
                              conditional: editQuestionData.conditional !== undefined ? editQuestionData.conditional : question.conditional
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

  const moveQuestionUp = (categoryId: string, serviceId: string, questionId: string) => {
    setServicesData(prev => ({
      ...prev,
      serviceCategories: prev.serviceCategories.map(category => 
        category.id === categoryId
          ? {
              ...category,
              services: category.services.map(service =>
                service.id === serviceId
                  ? {
                      ...service,
                      questions: (() => {
                        const sortedQuestions = [...service.questions].sort((a, b) => a.order - b.order);
                        const currentIndex = sortedQuestions.findIndex(q => q.id === questionId);
                        
                        if (currentIndex > 0) {
                          // Swap with previous question
                          const temp = sortedQuestions[currentIndex].order;
                          sortedQuestions[currentIndex].order = sortedQuestions[currentIndex - 1].order;
                          sortedQuestions[currentIndex - 1].order = temp;
                        }
                        
                        return sortedQuestions;
                      })()
                    }
                  : service
              )
            }
          : category
      )
    }));
  };

  const moveQuestionDown = (categoryId: string, serviceId: string, questionId: string) => {
    setServicesData(prev => ({
      ...prev,
      serviceCategories: prev.serviceCategories.map(category => 
        category.id === categoryId
          ? {
              ...category,
              services: category.services.map(service =>
                service.id === serviceId
                  ? {
                      ...service,
                      questions: (() => {
                        const sortedQuestions = [...service.questions].sort((a, b) => a.order - b.order);
                        const currentIndex = sortedQuestions.findIndex(q => q.id === questionId);
                        
                        if (currentIndex < sortedQuestions.length - 1) {
                          // Swap with next question
                          const temp = sortedQuestions[currentIndex].order;
                          sortedQuestions[currentIndex].order = sortedQuestions[currentIndex + 1].order;
                          sortedQuestions[currentIndex + 1].order = temp;
                        }
                        
                        return sortedQuestions;
                      })()
                    }
                  : service
              )
            }
          : category
      )
    }));
  };

  const startEditingQuestion = (categoryId: string, serviceId: string, question: Question) => {
    setEditingQuestion({ categoryId, serviceId, questionId: question.id });
    setEditQuestionData({
      text: question.text,
      type: question.type,
      options: question.options,
      required: question.required,
      conditional: question.conditional
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
        children: buildTree(question.id, depth + 1),
        condition: question.conditional
      }));
    };

    return rootQuestions.map(question => ({
      question,
      depth: 0,
      children: buildTree(question.id, 1),
      condition: null
    }));
  };

  // Render question flow tree
  const renderQuestionFlow = (flowTree: any[], categoryId: string, serviceId: string, questions: Question[]) => {
    const renderNode = (node: any, isLast = false, prefix = '') => {
      const { question, depth, children, condition } = node;
      const hasChildren = children && children.length > 0;
      
      return (
        <div key={question.id} className="relative">
                      {/* Question Node */}
            <div className={`flex items-start gap-3 p-4 rounded-lg mb-3 ${
              depth === 0 ? 'bg-blue-50 border-l-4 border-l-blue-500 shadow-sm' : 
              depth === 1 ? 'bg-orange-50 border-l-4 border-l-orange-400 shadow-sm ml-8' :
              depth === 2 ? 'bg-yellow-50 border-l-4 border-l-yellow-400 shadow-sm ml-16' :
              'bg-purple-50 border-l-4 border-l-purple-400 shadow-sm ml-24'
            }`}>
                          {/* Connection Line */}
              {depth > 0 && (
                <div className={`absolute -left-4 top-1/2 w-6 h-px ${
                  depth === 1 ? 'bg-orange-300' :
                  depth === 2 ? 'bg-yellow-300' :
                  'bg-purple-300'
                }`}></div>
              )}
            
            {/* Question Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-mono bg-white px-2 py-1 rounded border font-semibold">
                  #{question.order}
                </span>
                {depth === 0 ? (
                  <Zap className="w-4 h-4 text-blue-600" />
                ) : depth === 1 ? (
                  <GitBranch className="w-4 h-4 text-orange-600" />
                ) : depth === 2 ? (
                  <GitBranch className="w-4 h-4 text-yellow-600" />
                ) : (
                  <GitBranch className="w-4 h-4 text-purple-600" />
                )}
                {condition && (
                  <Badge variant="outline" className="text-xs bg-orange-100 text-orange-800 border-orange-300">
                    Conditional
                  </Badge>
                )}
                {question.required && (
                  <Badge variant="destructive" className="text-xs">
                    Required
                  </Badge>
                )}
              </div>
              
              <p className="font-semibold text-slate-800 font-inter mb-2 text-sm">
                {question.text}
              </p>
              
              {/* Conditional Logic Display - Enhanced */}
              {condition && (
                <div className="p-3 bg-gradient-to-r from-orange-100 to-yellow-50 rounded-md text-xs text-orange-800 font-inter mb-3 border border-orange-200">
                  <div className="flex items-center gap-2 mb-1">
                    <GitBranch className="w-3 h-3 text-orange-600" />
                    <strong>Conditional Trigger:</strong>
                  </div>
                  <div className="pl-5">
                    Question #{questions.find(q => q.id === condition.parentQuestionId)?.order || '?'}: "
                    {questions.find(q => q.id === condition.parentQuestionId)?.text?.substring(0, 30) || 'Unknown'}..."
                    <br />
                    <span className="bg-white px-2 py-1 rounded border text-orange-700 font-mono text-xs mt-1 inline-block">
                      {condition.operator === 'equals' ? '=' : 
                       condition.operator === 'contains' ? 'contains' : '≠'} "{condition.parentAnswerValue}"
                    </span>
                  </div>
                </div>
              )}
              
              {/* Question Type & Options */}
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs bg-white">
                  {question.type}
                </Badge>
                {question.options && question.options.length > 0 && (
                  <Badge variant="default" className="text-xs bg-green-100 text-green-800 border-green-200">
                    {question.options.length} options
                  </Badge>
                )}
              </div>

              {/* Show Options - Enhanced Display */}
              {question.options && question.options.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs text-slate-600 font-inter mb-1 font-medium">Available Options:</p>
                  <div className="flex flex-wrap gap-1">
                    {question.options.map((option, index) => (
                      <span key={index} className="text-xs bg-white px-2 py-1 rounded border text-slate-700 font-medium">
                        {option}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Actions */}
            {isEditable && (
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => startEditingQuestion(categoryId, serviceId, question)}
                  className="text-blue-600 hover:text-blue-800 h-8 w-8 p-0"
                >
                  <Edit className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeQuestion(categoryId, serviceId, question.id)}
                  className="text-red-500 hover:text-red-700 h-8 w-8 p-0"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            )}
          </div>
          
          {/* Children with enhanced connecting lines */}
          {hasChildren && (
                          <div className="relative">
                {/* Vertical line */}
                <div className={`absolute left-6 top-0 w-px h-4 ${
                  depth === 0 ? 'bg-orange-300' :
                  depth === 1 ? 'bg-yellow-300' :
                  'bg-purple-300'
                }`}></div>
                <div className="pl-8">
                  {children.map((child: any, index: number) => (
                    <div key={child.question.id} className="relative">
                      {/* Horizontal connector */}
                      <div className={`absolute -left-2 top-6 w-6 h-px ${
                        depth === 0 ? 'bg-orange-300' :
                        depth === 1 ? 'bg-yellow-300' :
                        'bg-purple-300'
                      }`}></div>
                      {renderNode(child, index === children.length - 1, prefix + '  ')}
                    </div>
                  ))}
                </div>
              </div>
          )}
        </div>
      );
    };

    return (
      <div className="space-y-1">
        {flowTree.length === 0 ? (
          <div className="text-center py-8 text-slate-500 font-inter">
            <GitBranch className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>No questions defined yet</p>
            <p className="text-sm">Add questions to see the flow diagram</p>
          </div>
        ) : (
          flowTree.map((node, index) => 
            renderNode(node, index === flowTree.length - 1)
          )
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
                                    .map((question, index, sortedQuestions) => (
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
                                      <div className="flex flex-col gap-1">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => moveQuestionUp(category.id, service.id, question.id)}
                                          disabled={index === 0}
                                          className="text-gray-500 hover:text-gray-700 h-6 w-6 p-0"
                                        >
                                          <ChevronUp className="w-3 h-3" />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() => moveQuestionDown(category.id, service.id, question.id)}
                                          disabled={index === sortedQuestions.length - 1}
                                          className="text-gray-500 hover:text-gray-700 h-6 w-6 p-0"
                                        >
                                          <ChevronDown className="w-3 h-3" />
                                        </Button>
                                      </div>
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
                              
                              <DialogContent className="max-h-[90vh] overflow-y-auto">
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
                                      <Label htmlFor="question-conditional" className="font-inter font-medium">
                                        Make this a conditional question
                                      </Label>
                                    </div>
                                    <p className="text-sm text-slate-500 mb-3 font-inter">
                                      Conditional questions only appear when a specific answer is given to a previous question.
                                    </p>
                                    
                                    {newQuestion.conditional && (
                                      <div className="space-y-3 pl-4 border-l-2 border-blue-200 bg-blue-50 p-3 rounded">
                                        <div>
                                          <Label htmlFor="parent-question" className="font-inter">Show this question when:</Label>
                                          <select
                                            id="parent-question"
                                            value={newQuestion.conditional.parentQuestionId}
                                            onChange={(e) => setNewQuestion(prev => ({
                                              ...prev,
                                              conditional: prev.conditional ? {
                                                ...prev.conditional,
                                                parentQuestionId: e.target.value
                                              } : undefined
                                            }))}
                                            className="w-full p-2 border border-gray-300 rounded-md font-inter mt-1"
                                          >
                                            <option value="">Select a question...</option>
                                            {service.questions
                                              .sort((a, b) => a.order - b.order)
                                              .map(q => (
                                                <option key={q.id} value={q.id}>
                                                  #{q.order}: {q.text} {q.conditional ? '(Conditional)' : ''}
                                                </option>
                                              ))}
                                          </select>
                                        </div>
                                        
                                        <div>
                                          <Label htmlFor="condition-operator" className="font-inter">Condition:</Label>
                                          <select
                                            id="condition-operator"
                                            value={newQuestion.conditional.operator}
                                            onChange={(e) => setNewQuestion(prev => ({
                                              ...prev,
                                              conditional: prev.conditional ? {
                                                ...prev.conditional,
                                                operator: e.target.value as ConditionalRule['operator']
                                              } : undefined
                                            }))}
                                            className="w-full p-2 border border-gray-300 rounded-md font-inter mt-1"
                                          >
                                            <option value="equals">equals</option>
                                            <option value="contains">contains</option>
                                            <option value="not_equals">does not equal</option>
                                          </select>
                                        </div>
                                        
                                        <div>
                                          <Label htmlFor="trigger-value" className="font-inter">Trigger Value:</Label>
                                          {(() => {
                                            const parentQuestion = service.questions.find(q => q.id === newQuestion.conditional?.parentQuestionId);
                                            if (parentQuestion?.type === 'select' && parentQuestion.options) {
                                              return (
                                                <select
                                                  id="trigger-value"
                                                  value={newQuestion.conditional.parentAnswerValue as string}
                                                  onChange={(e) => setNewQuestion(prev => ({
                                                    ...prev,
                                                    conditional: prev.conditional ? {
                                                      ...prev.conditional,
                                                      parentAnswerValue: e.target.value
                                                    } : undefined
                                                  }))}
                                                  className="w-full p-2 border border-gray-300 rounded-md font-inter mt-1"
                                                >
                                                  <option value="">Select trigger value...</option>
                                                  {parentQuestion.options.map(option => (
                                                    <option key={option} value={option}>
                                                      {option}
                                                    </option>
                                                  ))}
                                                </select>
                                              );
                                            } else {
                                              return (
                                                <Input
                                                  id="trigger-value"
                                                  placeholder="Enter the value that triggers this question..."
                                                  value={newQuestion.conditional.parentAnswerValue as string}
                                                  onChange={(e) => setNewQuestion(prev => ({
                                                    ...prev,
                                                    conditional: prev.conditional ? {
                                                      ...prev.conditional,
                                                      parentAnswerValue: e.target.value
                                                    } : undefined
                                                  }))}
                                                  className="font-inter mt-1"
                                                />
                                              );
                                            }
                                          })()}
                                          <p className="text-xs text-slate-500 mt-1 font-inter">
                                            This question will only appear when the selected question has this specific answer.
                                          </p>
                                        </div>
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
                                <DialogContent className="max-h-[90vh] overflow-y-auto">
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

                                    {/* Conditional Logic Section for Edit */}
                                    <div className="border-t pt-4">
                                      <div className="flex items-center space-x-2 mb-3">
                                        <input
                                          type="checkbox"
                                          id="edit-question-conditional"
                                          checked={!!editQuestionData.conditional}
                                          onChange={(e) => {
                                            if (e.target.checked) {
                                              setEditQuestionData(prev => ({ 
                                                ...prev, 
                                                conditional: {
                                                  parentQuestionId: '',
                                                  parentAnswerValue: '',
                                                  operator: 'equals'
                                                }
                                              }));
                                            } else {
                                              setEditQuestionData(prev => ({ ...prev, conditional: undefined }));
                                            }
                                          }}
                                        />
                                        <Label htmlFor="edit-question-conditional" className="font-inter font-medium">
                                          Make this a conditional question
                                        </Label>
                                      </div>
                                      <p className="text-sm text-slate-500 mb-3 font-inter">
                                        Conditional questions only appear when a specific answer is given to a previous question.
                                      </p>
                                      
                                      {editQuestionData.conditional && (
                                        <div className="space-y-3 pl-4 border-l-2 border-blue-200 bg-blue-50 p-3 rounded">
                                          <div>
                                            <Label htmlFor="edit-parent-question" className="font-inter">Show this question when:</Label>
                                            <select
                                              id="edit-parent-question"
                                              value={editQuestionData.conditional.parentQuestionId}
                                              onChange={(e) => setEditQuestionData(prev => ({
                                                ...prev,
                                                conditional: prev.conditional ? {
                                                  ...prev.conditional,
                                                  parentQuestionId: e.target.value
                                                } : undefined
                                              }))}
                                              className="w-full p-2 border border-gray-300 rounded-md font-inter mt-1"
                                            >
                                              <option value="">Select a question...</option>
                                              {service.questions
                                                .filter(q => q.id !== editingQuestion?.questionId) // Exclude self only
                                                .sort((a, b) => a.order - b.order)
                                                .map(q => (
                                                  <option key={q.id} value={q.id}>
                                                    #{q.order}: {q.text} {q.conditional ? '(Conditional)' : ''}
                                                  </option>
                                                ))}
                                            </select>
                                          </div>
                                          
                                          <div>
                                            <Label htmlFor="edit-condition-operator" className="font-inter">Condition:</Label>
                                            <select
                                              id="edit-condition-operator"
                                              value={editQuestionData.conditional.operator}
                                              onChange={(e) => setEditQuestionData(prev => ({
                                                ...prev,
                                                conditional: prev.conditional ? {
                                                  ...prev.conditional,
                                                  operator: e.target.value as ConditionalRule['operator']
                                                } : undefined
                                              }))}
                                              className="w-full p-2 border border-gray-300 rounded-md font-inter mt-1"
                                            >
                                              <option value="equals">equals</option>
                                              <option value="contains">contains</option>
                                              <option value="not_equals">does not equal</option>
                                            </select>
                                          </div>
                                          
                                          <div>
                                            <Label htmlFor="edit-trigger-value" className="font-inter">Trigger Value:</Label>
                                            {(() => {
                                              const parentQuestion = service.questions.find(q => q.id === editQuestionData.conditional?.parentQuestionId);
                                              if (parentQuestion?.type === 'select' && parentQuestion.options) {
                                                return (
                                                  <select
                                                    id="edit-trigger-value"
                                                    value={editQuestionData.conditional.parentAnswerValue as string}
                                                    onChange={(e) => setEditQuestionData(prev => ({
                                                      ...prev,
                                                      conditional: prev.conditional ? {
                                                        ...prev.conditional,
                                                        parentAnswerValue: e.target.value
                                                      } : undefined
                                                    }))}
                                                    className="w-full p-2 border border-gray-300 rounded-md font-inter mt-1"
                                                  >
                                                    <option value="">Select trigger value...</option>
                                                    {parentQuestion.options.map(option => (
                                                      <option key={option} value={option}>
                                                        {option}
                                                      </option>
                                                    ))}
                                                  </select>
                                                );
                                              } else {
                                                return (
                                                  <Input
                                                    id="edit-trigger-value"
                                                    placeholder="Enter the value that triggers this question..."
                                                    value={editQuestionData.conditional.parentAnswerValue as string}
                                                    onChange={(e) => setEditQuestionData(prev => ({
                                                      ...prev,
                                                      conditional: prev.conditional ? {
                                                        ...prev.conditional,
                                                        parentAnswerValue: e.target.value
                                                      } : undefined
                                                    }))}
                                                    className="font-inter mt-1"
                                                  />
                                                );
                                              }
                                            })()}
                                            <p className="text-xs text-slate-500 mt-1 font-inter">
                                              This question will only appear when the selected question has this specific answer.
                                            </p>
                                          </div>
                                        </div>
                                      )}
                                    </div>

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