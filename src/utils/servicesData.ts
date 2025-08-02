import servicesJsonData from '@/data/services.json';

export interface ConditionalRule {
  parentQuestionId: string;
  parentAnswerValue: string | string[]; // The answer that triggers this question
  operator: 'equals' | 'contains' | 'not_equals'; // How to compare the answer
}

export interface Question {
  id: string;
  text: string;
  type: 'text' | 'textarea' | 'select' | 'checkbox';
  options?: string[];
  required: boolean;
  conditional?: ConditionalRule; // If present, this question only shows based on previous answers
  order: number; // To maintain question order in the flow
}

export interface Service {
  id: string;
  name: string;
  description?: string;
  questions: Question[];
  isCurrentlyOffering: boolean;
}

export interface ServiceCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  services: Service[];
}

export interface ServicesData {
  serviceCategories: ServiceCategory[];
}

// Load initial data from JSON
export const getInitialServicesData = (): ServicesData => {
  return servicesJsonData as ServicesData;
};

// Function to export current data as JSON for manual update
export const exportServicesData = (data: ServicesData): string => {
  return JSON.stringify(data, null, 2);
};

// Function to download the data as a JSON file
export const downloadServicesData = (data: ServicesData, filename: string = 'services.json') => {
  const jsonString = exportServicesData(data);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Function to save data to localStorage for persistence during development
export const saveToLocalStorage = (data: ServicesData) => {
  try {
    localStorage.setItem('ownerInspections_servicesData', JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save to localStorage:', error);
  }
};

// Function to load data from localStorage
export const loadFromLocalStorage = (): ServicesData | null => {
  try {
    const saved = localStorage.getItem('ownerInspections_servicesData');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.warn('Failed to load from localStorage:', error);
  }
  return null;
};

// Function to save data to the actual services.json file
export const saveToFile = async (data: ServicesData): Promise<boolean> => {
  try {
    // Only attempt to save in development mode
    if (import.meta.env.DEV) {
      const response = await fetch('/api/save-services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data, null, 2)
      });
      
      if (response.ok) {
        console.log('Services data saved to file successfully');
        return true;
      } else {
        console.error('Failed to save services data to file');
        return false;
      }
    }
    return false;
  } catch (error) {
    console.error('Error saving to file:', error);
    return false;
  }
};

// Enhanced function to get initial data (always from file)
export const getInitialServicesDataWithPersistence = (): ServicesData => {
  // Clear any localStorage data to ensure we load from the JSON file
  try {
    localStorage.removeItem('ownerInspections_servicesData');
  } catch (error) {
    console.warn('Failed to clear localStorage:', error);
  }
  
  // Always load from the JSON file for consistency
  return servicesJsonData as ServicesData;
};

// Function to force refresh data from file (useful for development)
export const forceRefreshServicesData = async (): Promise<ServicesData> => {
  // Clear localStorage
  try {
    localStorage.removeItem('ownerInspections_servicesData');
  } catch (error) {
    console.warn('Failed to clear localStorage:', error);
  }
  
  // Force reload the JSON data with cache busting
  const timestamp = Date.now();
  const freshData = await import(`@/data/services.json?t=${timestamp}`);
  return freshData.default as ServicesData;
};

// Icon mapping function since we can't store React components in JSON
export const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'Home':
      return 'Home';
    case 'Building':
      return 'Building';
    case 'Shield':
      return 'Shield';
    case 'Scale':
      return 'Scale';
    case 'Headphones':
      return 'Headphones';
    default:
      return 'Home';
  }
};

// Utility to get question flow for a service
export const getQuestionFlow = (questions: Question[]) => {
  const sortedQuestions = questions.sort((a, b) => a.order - b.order);
  const flow: { [key: string]: Question[] } = {};
  
  // Group questions by their dependencies
  sortedQuestions.forEach(question => {
    if (!question.conditional) {
      // Root level questions
      if (!flow['root']) flow['root'] = [];
      flow['root'].push(question);
    } else {
      // Conditional questions
      const parentId = question.conditional.parentQuestionId;
      if (!flow[parentId]) flow[parentId] = [];
      flow[parentId].push(question);
    }
  });
  
  return flow;
};

// Utility to validate conditional logic
export const validateConditionalLogic = (questions: Question[]): string[] => {
  const errors: string[] = [];
  const questionIds = questions.map(q => q.id);
  
  questions.forEach(question => {
    if (question.conditional) {
      // Check if parent question exists
      if (!questionIds.includes(question.conditional.parentQuestionId)) {
        errors.push(`Question "${question.text}" references non-existent parent question`);
      }
      
      // Check if parent question comes before this question
      const parentQuestion = questions.find(q => q.id === question.conditional.parentQuestionId);
      if (parentQuestion && parentQuestion.order >= question.order) {
        errors.push(`Question "${question.text}" references a question that comes after it in the flow`);
      }
    }
  });
  
  return errors;
}; 