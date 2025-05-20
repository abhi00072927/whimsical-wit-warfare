
import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Globe, Layers, Import, Export, ChartBar, Image, Video } from "lucide-react";
import { Card } from "@/components/ui/card";
import ThreeJSViewer from "@/components/ThreeJSViewer";

export default function Business() {
  const [activeTab, setActiveTab] = useState<"import" | "export" | "about">("about");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">AGH International</h1>
          <p className="text-xl md:text-2xl mb-8">Global Import & Export Solutions</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
              <Globe className="mr-2 h-5 w-5" /> Our Services
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              <ChartBar className="mr-2 h-5 w-5" /> Market Analysis
            </Button>
          </div>
        </div>
      </div>
      
      {/* 3D Animation */}
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Global Shipping Visualization</h2>
          <div className="h-[400px] bg-white rounded-lg shadow-lg overflow-hidden">
            <ThreeJSViewer />
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap border-b border-gray-300 mb-8">
          <button 
            className={`px-6 py-3 font-medium ${activeTab === 'about' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
            onClick={() => setActiveTab("about")}
          >
            About AGH
          </button>
          <button 
            className={`px-6 py-3 font-medium ${activeTab === 'import' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
            onClick={() => setActiveTab("import")}
          >
            <Import className="inline mr-2 h-4 w-4" /> Import Services
          </button>
          <button 
            className={`px-6 py-3 font-medium ${activeTab === 'export' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
            onClick={() => setActiveTab("export")}
          >
            <Export className="inline mr-2 h-4 w-4" /> Export Services
          </button>
        </div>
        
        <div className="tab-content">
          {activeTab === 'about' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">About AGH International</h2>
              <p className="text-lg text-gray-700">
                AGH International is a leading global import-export company specializing in connecting businesses worldwide. 
                With decades of experience and a vast network of partners, we facilitate seamless international trade across continents.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6">
                  <Globe className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Global Reach</h3>
                  <p className="text-gray-600">Operating in over 120 countries with established logistics networks.</p>
                </Card>
                <Card className="p-6">
                  <Layers className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Diverse Portfolio</h3>
                  <p className="text-gray-600">Handling everything from consumer goods to industrial equipment and raw materials.</p>
                </Card>
                <Card className="p-6">
                  <ChartBar className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Market Intelligence</h3>
                  <p className="text-gray-600">Data-driven insights to help you make informed business decisions.</p>
                </Card>
              </div>
            </div>
          )}
          
          {activeTab === 'import' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">Import Services</h2>
              <p className="text-lg text-gray-700">
                AGH International provides comprehensive import services to businesses looking to source products globally.
                Our extensive network and expertise ensure smooth procurement and delivery.
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                {importServices.map((service, index) => (
                  <Card key={index} className="p-6 flex flex-col h-full">
                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-4 flex-1">{service.description}</p>
                    <Button>Request Quote</Button>
                  </Card>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'export' && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">Export Services</h2>
              <p className="text-lg text-gray-700">
                Expand your business globally with AGH International's export services.
                We handle everything from market research to logistics and regulatory compliance.
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                {exportServices.map((service, index) => (
                  <Card key={index} className="p-6 flex flex-col h-full">
                    <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-4 flex-1">{service.description}</p>
                    <Button>Learn More</Button>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Contact Section */}
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Go Global?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Contact our team of international trade experts to discuss your business needs.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100">
              Contact Us
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              Request Consultation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const importServices = [
  {
    title: "Product Sourcing",
    description: "We help you find reliable suppliers for your specific product needs across global markets."
  },
  {
    title: "Customs Clearance",
    description: "Our team handles all documentation and regulatory requirements for smooth customs processing."
  },
  {
    title: "Quality Control",
    description: "Rigorous inspection and quality control processes to ensure products meet your specifications."
  },
  {
    title: "Warehousing & Distribution",
    description: "Efficient storage and distribution services to streamline your supply chain."
  }
];

const exportServices = [
  {
    title: "Market Analysis",
    description: "In-depth research to identify the best international markets for your products."
  },
  {
    title: "Documentation & Compliance",
    description: "Complete management of export documentation and regulatory compliance requirements."
  },
  {
    title: "Logistics Management",
    description: "End-to-end logistics coordination including freight forwarding and shipping."
  },
  {
    title: "Payment Processing",
    description: "Secure international payment solutions to facilitate your export transactions."
  }
];
