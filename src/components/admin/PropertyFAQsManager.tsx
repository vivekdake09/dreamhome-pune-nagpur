
import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Pencil, Plus, Trash2, MoveUp, MoveDown } from 'lucide-react';
import { FAQ, fetchFAQsByPropertyId, createFAQ, updateFAQ, deleteFAQ, updateFAQOrder } from '@/services/faqService';

interface PropertyFAQsManagerProps {
  propertyId: string;
  propertyName: string;
}

const PropertyFAQsManager: React.FC<PropertyFAQsManagerProps> = ({ propertyId, propertyName }) => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentFAQ, setCurrentFAQ] = useState<Partial<FAQ>>({
    property_id: propertyId,
    question: '',
    answer: '',
    order: 0
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch FAQs when component mounts
  useEffect(() => {
    loadFAQs();
  }, [propertyId]);

  const loadFAQs = async () => {
    setIsLoading(true);
    try {
      const data = await fetchFAQsByPropertyId(propertyId);
      setFaqs(data);
    } catch (error) {
      toast.error('Failed to load FAQs');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDialog = (faq?: FAQ) => {
    if (faq) {
      setCurrentFAQ(faq);
      setIsEditing(true);
    } else {
      setCurrentFAQ({
        property_id: propertyId,
        question: '',
        answer: '',
        order: faqs.length > 0 ? Math.max(...faqs.map(f => f.order)) + 1 : 1
      });
      setIsEditing(false);
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentFAQ(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveFAQ = async () => {
    if (!currentFAQ.question || !currentFAQ.answer) {
      toast.error('Question and answer are required');
      return;
    }

    try {
      if (isEditing && currentFAQ.id) {
        await updateFAQ(currentFAQ.id, {
          question: currentFAQ.question,
          answer: currentFAQ.answer
        });
        toast.success('FAQ updated successfully');
      } else {
        await createFAQ({
          property_id: propertyId,
          question: currentFAQ.question || '',
          answer: currentFAQ.answer || '',
          order: currentFAQ.order || faqs.length + 1
        });
        toast.success('FAQ added successfully');
      }
      handleCloseDialog();
      loadFAQs();
    } catch (error) {
      toast.error(isEditing ? 'Failed to update FAQ' : 'Failed to add FAQ');
      console.error(error);
    }
  };

  const handleDeleteFAQ = async (id: string) => {
    if (confirm('Are you sure you want to delete this FAQ?')) {
      try {
        await deleteFAQ(id);
        toast.success('FAQ deleted successfully');
        loadFAQs();
      } catch (error) {
        toast.error('Failed to delete FAQ');
        console.error(error);
      }
    }
  };

  const handleMoveUp = async (index: number) => {
    if (index <= 0) return;
    
    const newFaqs = [...faqs];
    const temp = newFaqs[index - 1].order;
    newFaqs[index - 1].order = newFaqs[index].order;
    newFaqs[index].order = temp;
    
    try {
      await updateFAQOrder([
        { id: newFaqs[index - 1].id, order: newFaqs[index - 1].order },
        { id: newFaqs[index].id, order: newFaqs[index].order }
      ]);
      
      // Re-sort the array by order
      newFaqs.sort((a, b) => a.order - b.order);
      setFaqs(newFaqs);
      toast.success('FAQ order updated');
    } catch (error) {
      toast.error('Failed to update FAQ order');
      console.error(error);
    }
  };

  const handleMoveDown = async (index: number) => {
    if (index >= faqs.length - 1) return;
    
    const newFaqs = [...faqs];
    const temp = newFaqs[index + 1].order;
    newFaqs[index + 1].order = newFaqs[index].order;
    newFaqs[index].order = temp;
    
    try {
      await updateFAQOrder([
        { id: newFaqs[index + 1].id, order: newFaqs[index + 1].order },
        { id: newFaqs[index].id, order: newFaqs[index].order }
      ]);
      
      // Re-sort the array by order
      newFaqs.sort((a, b) => a.order - b.order);
      setFaqs(newFaqs);
      toast.success('FAQ order updated');
    } catch (error) {
      toast.error('Failed to update FAQ order');
      console.error(error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">FAQs for {propertyName}</h2>
        <Button onClick={() => handleOpenDialog()} className="flex items-center gap-1">
          <Plus className="h-4 w-4" /> Add FAQ
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading FAQs...</div>
      ) : faqs.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No FAQs have been created for this property yet.</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Order</TableHead>
              <TableHead className="w-1/3">Question</TableHead>
              <TableHead>Answer</TableHead>
              <TableHead className="w-28 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {faqs.map((faq, index) => (
              <TableRow key={faq.id}>
                <TableCell className="w-12">
                  <div className="flex items-center gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                      className="h-6 w-6 p-0"
                    >
                      <MoveUp className="h-4 w-4" />
                    </Button>
                    <span>{faq.order}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleMoveDown(index)}
                      disabled={index === faqs.length - 1}
                      className="h-6 w-6 p-0"
                    >
                      <MoveDown className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="font-medium truncate max-w-xs" title={faq.question}>{faq.question}</TableCell>
                <TableCell className="truncate max-w-xs" title={faq.answer}>{faq.answer}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleOpenDialog(faq)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteFAQ(faq.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit FAQ' : 'Add New FAQ'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="question" className="text-sm font-medium">Question</label>
              <Input
                id="question"
                name="question"
                value={currentFAQ.question}
                onChange={handleInputChange}
                placeholder="Enter question"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="answer" className="text-sm font-medium">Answer</label>
              <Textarea
                id="answer"
                name="answer"
                value={currentFAQ.answer}
                onChange={handleInputChange}
                placeholder="Enter answer"
                className="w-full"
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="button" onClick={handleSaveFAQ}>
              {isEditing ? 'Update' : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PropertyFAQsManager;
