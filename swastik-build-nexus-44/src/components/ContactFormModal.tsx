
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { User, Phone, Mail, MessageSquare, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { inquiriesApi } from "@/services/cmsApi";

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactFormModal = ({ isOpen, onClose }: ContactFormModalProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    contactNumber: '',
    email: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const name = `${formData.firstName} ${formData.lastName}`.trim();
      await inquiriesApi.submit({
        name,
        email: formData.email,
        phone: formData.contactNumber,
        message: formData.message,
        source: 'website'
      });

      console.log('Form submitted:', formData);
      setShowSuccess(true);
      try {
        localStorage.setItem('contactFormSubmitted', 'true');
      } catch (err) { }
      toast.success('Your enquiry has been submitted successfully!');
    } catch (err: any) {
      console.error('Submission failed:', err);
      toast.error(err.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      contactNumber: '',
      email: '',
      message: ''
    });
    setShowSuccess(false);
  };

  const handleClose = () => {
    handleReset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl p-0 bg-transparent border-0 shadow-none max-h-[90vh] overflow-y-auto">
        <div className="relative mx-4 sm:mx-0">
          {!showSuccess ? (
            // Contact Form
            <div
              className="bg-white p-6 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden rounded-tl-[80px] rounded-br-[80px] rounded-tr-[8px] rounded-bl-[8px] sm:rounded-tl-[120px] sm:rounded-br-[120px]"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
              }}
            >
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3">Contact Us</h2>
                <p className="text-sm sm:text-base text-gray-600">Please fill your details below</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <Input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="h-12 pl-12 pr-4 border border-gray-200 bg-white rounded-xl text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      placeholder="First Name"
                      required
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <Input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="h-12 pl-12 pr-4 border border-gray-200 bg-white rounded-xl text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      placeholder="Last Name"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                      <Phone className="w-5 h-5 text-gray-400" />
                    </div>
                    <Input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleInputChange}
                      className="h-12 pl-12 pr-4 border border-gray-200 bg-white rounded-xl text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      placeholder="Contact Number"
                      required
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
                      <Mail className="w-5 h-5 text-gray-400" />
                    </div>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="h-12 pl-12 pr-4 border border-gray-200 bg-white rounded-xl text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      placeholder="Email ID"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute left-4 top-4 z-10">
                    <MessageSquare className="w-5 h-5 text-gray-400" />
                  </div>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="min-h-[120px] pl-12 pr-4 pt-4 border border-gray-200 bg-white rounded-xl text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                    placeholder="Message"
                    required
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 sm:px-12 h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Enquire Now'
                    )}
                  </Button>

                  <div className="flex items-center justify-center">
                    <div className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 shadow-lg hover:shadow-xl">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                      </svg>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            // Success Message
            <div
              className="bg-white p-6 sm:p-8 md:p-12 shadow-2xl text-center relative flex flex-col justify-center rounded-tl-[80px] rounded-br-[80px] rounded-tr-[8px] rounded-bl-[8px] sm:rounded-tl-[120px] sm:rounded-br-[120px]"
              style={{
                background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                minHeight: '250px'
              }}
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                Thank you for reaching out!
              </h2>
              <p className="text-blue-600 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed">
                "Our team is reviewing your request and will contact you soon with the next steps."
              </p>
              <Button
                onClick={handleClose}
                className="mx-auto px-6 sm:px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Close
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormModal;
