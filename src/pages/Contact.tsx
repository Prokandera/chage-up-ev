
import { useState } from 'react';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background doodles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-10 w-40 h-40 bg-primary/5 rounded-full animate-float" />
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-secondary/5 rounded-full animate-float-delayed" />
        <svg className="absolute top-1/2 left-1/4 w-24 h-24 text-primary/10 animate-pulse-glow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      
      <Navbar />
      
      <main className="flex-1 relative z-10">
        <div className="bg-gradient-to-r from-ev-blue/10 to-ev-green/10 py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl animate-slide-in-bottom gradient-text">Contact Us</h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground animate-fade-in">
                Got questions about our service? Need help with a booking?
                Our team is here to assist you.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            <div className="animate-slide-in-left">
              <h2 className="text-3xl font-bold tracking-tight text-foreground">Get in Touch</h2>
              <p className="mt-4 text-lg leading-8 text-gray-600">
                We're here to help with any questions about EV charging stations, 
                booking issues, or partnership opportunities.
              </p>
              
              <div className="mt-8 space-y-6">
                <div className="flex gap-x-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-ev-blue to-ev-green">
                    <Mail className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold leading-7 text-gray-900">Email</h3>
                    <p className="mt-2 leading-7 text-gray-600">
                      <a href="mailto:support@electricchargehub.com" className="hover:text-ev-blue">
                        support@electricchargehub.com
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-x-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-ev-blue to-ev-green">
                    <Phone className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold leading-7 text-gray-900">Phone</h3>
                    <p className="mt-2 leading-7 text-gray-600">
                      <a href="tel:+18005551212" className="hover:text-ev-blue">
                        +1 (800) 555-1212
                      </a>
                    </p>
                    <p className="mt-1 text-sm leading-6 text-gray-400">
                      Monday-Friday, 9am-6pm ET
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-x-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-ev-blue to-ev-green">
                    <MapPin className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold leading-7 text-gray-900">Headquarters</h3>
                    <p className="mt-2 leading-7 text-gray-600">
                      East Delhi
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 rounded-lg bg-gray-50 p-8">
                <h3 className="text-base font-semibold leading-7 text-gray-900">Station Owners</h3>
                <p className="mt-4 leading-7 text-gray-600">
                  Are you a charging station owner? Partner with us to increase visibility 
                  and occupancy for your stations. 
                </p>
                <div className="mt-6">
                  <Button variant="outline">
                    Learn about partnerships
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="rounded-2xl glass-effect p-8 shadow-lg ring-1 ring-border animate-slide-in-right hover-lift">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">Send us a message</h2>
              
              {isSubmitted ? (
                <div className="mt-10 flex flex-col items-center justify-center text-center">
                  <div className="rounded-full bg-green-100 p-3">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900">Message Sent!</h3>
                  <p className="mt-2 text-gray-600">
                    Thank you for contacting us. We'll get back to you as soon as possible.
                  </p>
                  <Button 
                    onClick={() => setIsSubmitted(false)} 
                    className="mt-6 bg-gradient-to-r from-ev-blue to-ev-green hover:from-ev-blue hover:to-ev-indigo"
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                      Name
                    </label>
                    <Input 
                      id="name"
                      name="name"
                      type="text"
                      value={formState.name}
                      onChange={handleInputChange}
                      required
                      className="mt-2"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                      Email
                    </label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      required
                      className="mt-2"
                      placeholder="you@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium leading-6 text-gray-900">
                      Subject
                    </label>
                    <Input 
                      id="subject"
                      name="subject"
                      type="text"
                      value={formState.subject}
                      onChange={handleInputChange}
                      required
                      className="mt-2"
                      placeholder="How can we help you?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium leading-6 text-gray-900">
                      Message
                    </label>
                    <Textarea 
                      id="message"
                      name="message"
                      rows={5}
                      value={formState.message}
                      onChange={handleInputChange}
                      required
                      className="mt-2"
                      placeholder="Tell us how we can assist you..."
                    />
                  </div>
                  
                  <div>
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-ev-blue to-ev-green hover:from-ev-blue hover:to-ev-indigo"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
