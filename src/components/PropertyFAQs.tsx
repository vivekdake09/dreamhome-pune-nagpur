
import React from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { FAQ } from '@/services/faqService';
import { HelpCircle } from 'lucide-react';

interface PropertyFAQsProps {
  faqs: FAQ[];
}

const PropertyFAQs: React.FC<PropertyFAQsProps> = ({ faqs }) => {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <HelpCircle className="h-5 w-5 mr-2 text-realestate-600" />
        Frequently Asked Questions
      </h2>
      
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id}>
            <AccordionTrigger className="text-left font-medium text-gray-800 hover:text-realestate-600">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 whitespace-pre-line">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default PropertyFAQs;
