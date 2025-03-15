import React from 'react';
import Card from '../components/Card/Card';
import Navbar from '../components/Navbar/Navbar';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Navbar */}
      <Navbar transparent={true} />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 pt-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Welcome to</span>
              <span className="block text-indigo-600">Your Amazing Platform</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Your one-stop solution for managing everything you need. Simple, powerful, and designed for you.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="rounded-md shadow">
                <a
                  href="#features"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                >
                  Get started
                </a>
              </div>
              <div className="ml-3 rounded-md shadow">
                <a
                  href="#about"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative blob */}
        <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="absolute inset-0 flex">
            <div className="h-full w-1/2" style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)' }}></div>
            <div className="h-full w-1/2" style={{ backgroundColor: 'rgba(99, 102, 241, 0.05)' }}></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card elevated={false} bordered={false} padding="lg" className="mb-10">
            <div className="lg:text-center">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Everything you need to succeed
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Our platform offers a comprehensive set of tools to help you achieve your goals.
              </p>
            </div>
          </Card>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Smart Analytics',
                  description: 'Get insights into your data with our powerful analytics tools.',
                  icon: '📊',
                },
                {
                  title: 'Seamless Integration',
                  description: 'Connect with your favorite apps and services effortlessly.',
                  icon: '🔄',
                },
                {
                  title: 'Real-time Collaboration',
                  description: 'Work together with your team in real-time.',
                  icon: '👥',
                },
                {
                  title: 'Secure Storage',
                  description: 'Your data is encrypted and stored securely in the cloud.',
                  icon: '🔒',
                },
                {
                  title: 'Mobile Access',
                  description: 'Access your dashboard from anywhere, on any device.',
                  icon: '📱',
                },
                {
                  title: '24/7 Support',
                  description: 'Our support team is always available to help you.',
                  icon: '🛟',
                },
              ].map((feature, index) => (
                <Card 
                  key={index}
                  elevated={true}
                  className="h-full transition-transform duration-300 hover:scale-105"
                  title={
                    <div className="flex items-center">
                      <span className="text-2xl mr-2">{feature.icon}</span>
                      <span>{feature.title}</span>
                    </div>
                  }
                >
                  <p className="text-gray-500">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="about" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card elevated={false} bordered={false} padding="lg" className="mb-10">
            <h2 className="text-3xl font-extrabold text-center text-gray-900">
              Trusted by thousands of users worldwide
            </h2>
          </Card>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote: "This platform revolutionized how we manage our projects. Couldn't imagine work without it now.",
                author: "Sarah Johnson",
                role: "Product Manager at TechCorp"
              },
              {
                quote: "The analytics features alone have saved us thousands of dollars in optimization costs.",
                author: "Michael Chen",
                role: "CTO at StartupX"
              },
              {
                quote: "Intuitive interface combined with powerful features. The perfect balance.",
                author: "Aisha Patel",
                role: "Designer at CreativeStudio"
              }
            ].map((testimonial, index) => (
              <Card key={index} bordered={true} elevated={false} className="h-full">
                <div className="h-full flex flex-col">
                  <div className="flex-grow">
                    <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                  </div>
                  <div className="mt-4">
                    <p className="font-medium text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card elevated={false} bordered={false} padding="lg" className="mb-10">
            <div className="lg:text-center">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Pricing</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Plans for businesses of all sizes
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Choose the perfect plan for your needs. Always transparent pricing.
              </p>
            </div>
          </Card>
          
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              {
                name: "Starter",
                price: "$9",
                description: "Perfect for small projects and individuals just getting started.",
                features: ["5 Projects", "Up to 10 Users", "Basic Analytics", "Email Support"]
              },
              {
                name: "Professional",
                price: "$29",
                description: "Everything a growing business needs to thrive and expand.",
                features: ["Unlimited Projects", "Up to 100 Users", "Advanced Analytics", "Priority Support", "Custom Integrations"]
              },
              {
                name: "Enterprise",
                price: "$99",
                description: "Advanced features and support for large organizations.",
                features: ["Unlimited Everything", "24/7 Dedicated Support", "Custom Development", "SLA", "On-premise Option"]
              }
            ].map((plan, index) => (
              <Card 
                key={index}
                elevated={index === 1} 
                bordered={true}
                className={`h-full ${index === 1 ? 'border-indigo-500 transform -translate-y-4' : ''}`}
                title={<h3 className="text-2xl font-bold">{plan.name}</h3>}
                subtitle={<div className="flex items-baseline">
                  <span className="text-4xl font-extrabold">{plan.price}</span>
                  <span className="ml-1 text-xl text-gray-500">/month</span>
                </div>}
                footer={
                  <a
                    href="#"
                    className={`block w-full text-center px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                      index === 1 
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                        : 'border border-indigo-600 text-indigo-600 hover:bg-indigo-50'
                    }`}
                  >
                    Get started
                  </a>
                }
              >
                <p className="text-gray-500 mb-4">{plan.description}</p>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card elevated={true} bordered={true} padding="lg" className="max-w-4xl mx-auto">
            <div className="lg:text-center mb-8">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Contact Us</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Get in Touch
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Have questions? We're here to help with anything you need.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <form>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" id="name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" id="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea id="message" rows={4} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                  </div>
                  <button type="submit" className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md font-medium transition-colors duration-200">
                    Send Message
                  </button>
                </form>
              </div>
              <div className="flex flex-col justify-center">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <span className="text-indigo-600 text-2xl mr-3">📍</span>
                    <div>
                      <h3 className="font-medium">Our Location</h3>
                      <p className="text-gray-500">123 Innovation Street, Tech City, 10001</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-indigo-600 text-2xl mr-3">📞</span>
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-gray-500">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-indigo-600 text-2xl mr-3">✉️</span>
                    <div>
                      <h3 className="font-medium">Email</h3>
                      <p className="text-gray-500">support@yourcompany.com</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-indigo-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to dive in?</span>
            <span className="block text-indigo-200">Start your free trial today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
              >
                Get started
              </a>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <a
                href="#"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Learn more
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Product</h3>
              <ul className="mt-4 space-y-4">
                {['Features', 'Pricing', 'Integrations', 'FAQ'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-base text-gray-300 hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-4">
                {['About', 'Team', 'Careers', 'Press'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-base text-gray-300 hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Resources</h3>
              <ul className="mt-4 space-y-4">
                {['Blog', 'Documentation', 'Community', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-base text-gray-300 hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-4">
                {['Privacy', 'Terms', 'Cookie Policy', 'Licenses'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-base text-gray-300 hover:text-white">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              {['Twitter', 'Facebook', 'Instagram', 'GitHub', 'LinkedIn'].map((social) => (
                <a key={social} href="#" className="text-gray-400 hover:text-gray-300">
                  <span className="sr-only">{social}</span>
                  {/* You can add icons here if needed */}
                  <span>{social}</span>
                </a>
              ))}
            </div>
            <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
              &copy; 2023 Your Company Name. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
