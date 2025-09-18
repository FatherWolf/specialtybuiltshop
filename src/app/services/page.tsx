'use client'

import { motion } from 'framer-motion'
import { Wrench, Settings, Truck, Gauge, Zap, Shield, Clock, Award } from 'lucide-react'
import Header from '../../components/Header'

export default function Services() {
  const services = [
    {
      icon: Wrench,
      title: "6.0 Powerstroke Bulletproofing",
      description: "Specialized bulletproofing services for 6.0 Powerstroke engines - one of Dan's core areas of expertise.",
      features: ["Head gasket replacement", "ARP head studs", "EGR delete", "Oil cooler upgrade"],
      price: "Call for quote"
    },
    {
      icon: Settings,
      title: "Duramax Specialist Services",
      description: "Expert Duramax repair and maintenance - Dan's primary area of specialization with years of focused experience.",
      features: ["LB7 injector issues", "LLY overheating fixes", "LBZ/LMM maintenance", "L5P diagnostics"],
      price: "Call for quote"
    },
    {
      icon: Truck,
      title: "Cummins General Maintenance",
      description: "Comprehensive maintenance and repair services for Cummins diesel engines.",
      features: ["Routine maintenance", "Fuel system service", "Cooling system repair", "Diagnostic troubleshooting"],
      price: "Call for quote"
    },
    {
      icon: Gauge,
      title: "Gas Vehicle Service",
      description: "While not my specialty, I offer gas vehicle work where diesel knowledge applies. Always learning and helping where possible.",
      features: ["General maintenance", "Engine diagnostics", "Repair consultation", "Honest assessment"],
      price: "Call for quote"
    },
    {
      icon: Shield,
      title: "Custom Fabrication (FABMD Partnership)",
      description: "Partnership with FABMD for comprehensive metal fabrication work - from simple projects to complex automotive components.",
      features: ["Steel stair handles", "Intercooler piping", "Custom brackets", "Any metal project you can imagine"],
      price: "Quote on request"
    },
    {
      icon: Zap,
      title: "Industry Connections & Referrals",
      description: "Extensive network of diesel industry contacts. If I can't handle your project, I'll connect you with the right specialist.",
      features: ["Specialist referrals", "Industry advice", "Project consultation", "Honest recommendations"],
      price: "Free consultation"
    }
  ]

  const whyChooseUs = [
    {
      icon: Award,
      title: "4+ Years Diesel Experience",
      description: "Specialized experience with Duramax, Cummins, and Powerstroke engines"
    },
    {
      icon: Clock,
      title: "Honest Assessment",
      description: "If Dan's not confident in the work, he'll refer you to the right specialist"
    },
    {
      icon: Shield,
      title: "Industry Network",
      description: "Extensive contacts to connect you with specialists when needed"
    },
    {
      icon: Gauge,
      title: "FABMD Partnership",
      description: "Access to professional custom fabrication services"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Services Header */}
      <section className="py-24 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Our <span className="text-primary">Services</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
              Specialized diesel repair with 4+ years experience. Duramax expertise, 6.0 Powerstroke bulletproofing, and custom fabrication.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-accent border border-muted rounded-lg p-6 hover:border-primary/50 transition-all hover:shadow-lg"
              >
                <service.icon className="w-12 h-12 text-secondary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">{service.title}</h3>
                <p className="text-foreground/70 mb-4">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-foreground/80">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="border-t border-muted pt-4">
                  <p className="text-primary font-semibold">{service.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Why Choose <span className="text-secondary">Specialty Built</span>?
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              We&apos;re more than just a diesel shop - we&apos;re your performance partners
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <item.icon className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-foreground/70">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Our <span className="text-primary">Process</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Simple, transparent, and efficient service from start to finish
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Consultation & Diagnosis",
                description: "We listen to your concerns and perform comprehensive diagnostics to identify the issue."
              },
              {
                step: "02",
                title: "Detailed Estimate",
                description: "You'll receive a detailed estimate with no hidden fees before any work begins."
              },
              {
                step: "03",
                title: "Expert Service",
                description: "Our certified technicians complete the work using quality parts and proven techniques."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-bold text-xl mb-6 mx-auto">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-foreground/70">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Schedule Service?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Get your diesel running at peak performance with our expert service
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Schedule Service
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}