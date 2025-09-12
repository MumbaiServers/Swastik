import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const AdminFAQs = () => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      id: 1,
      question: 'What is the booking process for your projects?',
      answer: 'Our booking process is simple and transparent. You can visit our sales office, choose your preferred unit, pay the booking amount, and complete the documentation.',
      category: 'Booking',
      lastUpdated: '2024-01-15'
    },
    {
      id: 2,
      question: 'What are the payment plans available?',
      answer: 'We offer flexible payment plans including construction-linked plans, time-linked plans, and subvention schemes to suit different financial needs.',
      category: 'Payment',
      lastUpdated: '2024-01-12'
    },
    {
      id: 3,
      question: 'Do you provide home loans assistance?',
      answer: 'Yes, we have tie-ups with leading banks and financial institutions to help you get the best home loan deals at competitive interest rates.',
      category: 'Finance',
      lastUpdated: '2024-01-10'
    },
    {
      id: 4,
      question: 'What is the possession timeline?',
      answer: 'Possession timelines vary by project. Typically, it ranges from 24-36 months from the launch date. Specific timelines are mentioned in the agreement.',
      category: 'Possession',
      lastUpdated: '2024-01-08'
    }
  ];

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const categories = ['All', 'Booking', 'Payment', 'Finance', 'Possession'];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">FAQs Management</h1>
          <p className="text-muted-foreground">
            Manage frequently asked questions
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New FAQ
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>
            Filter FAQs by category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button key={category} variant="outline" size="sm">
                {category}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <Card key={faq.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFaq(faq.id)}
                      className="p-0 h-auto"
                    >
                      {expandedFaq === faq.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-md text-xs">
                      {faq.category}
                    </span>
                    <span>Last updated: {faq.lastUpdated}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="outline" size="sm">
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            {expandedFaq === faq.id && (
              <CardContent>
                <div className="p-4 bg-muted/30 rounded-md">
                  <p className="text-sm">{faq.answer}</p>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>FAQ Statistics</CardTitle>
          <CardDescription>
            Content overview and analytics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">18</div>
              <div className="text-sm text-muted-foreground">Total FAQs</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">5</div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">4</div>
              <div className="text-sm text-muted-foreground">Updated This Month</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-primary">95%</div>
              <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminFAQs;