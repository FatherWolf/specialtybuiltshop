'use client'

import { motion } from 'framer-motion'
import { Users, Award, Wrench, Target, Heart, Truck } from 'lucide-react'
import Header from '../../components/Header'

export default function About() {
  const stats = [
    { number: "4+", label: "Years Experience" },
    { number: "500+", label: "Vehicles Serviced" },
    { number: "100+", label: "Diesel Repairs" },
    { number: "24/7", label: "Text & Call Support" }
  ]

  const team = [
    {
      name: "Dan",
      role: "Owner & Diesel Specialist",
      experience: "4+ years in diesel performance",
      specialties: ["Duramax Expert", "6.0 Powerstroke Bulletproofing", "Cummins Maintenance"]
    },
    {
      name: "FABMD Partnership",
      role: "Custom Fabrication Partner",
      experience: "Specialized metal fabrication",
      specialties: ["Steel Work", "Intercooler Piping", "Custom Metal Projects"]
    }
  ]

  const values = [
    {
      icon: Heart,
      title: "Passion",
      description: "We live and breathe diesel performance. Every project is a chance to push boundaries."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We never compromise on quality. Your diesel deserves nothing but the best."
    },
    {
      icon: Users,
      title: "Community",
      description: "We're part of the diesel community, supporting enthusiasts and professionals alike."
    },
    {
      icon: Target,
      title: "Innovation",
      description: "Always exploring new techniques and technologies to deliver superior results."
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* About Header */}
      <section className="py-24 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              About <span className="text-primary">Specialty Built</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto">
              More than just a diesel shop - we&apos;re performance specialists dedicated to maximizing your diesel&apos;s potential.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                Our <span className="text-secondary">Story</span>
              </h2>
              <div className="space-y-4 text-foreground/80">
                <p>
                  Founded by Dan, Specialty Built Performance and Fab began with 4 years of hands-on diesel experience, 
                  starting with bulletproofing 6.0 Powerstrokes and general maintenance on Duramax and Cummins engines.
                </p>
                <p>
                  Over time, Dan developed specialized expertise in Duramax engines, which became his primary area of knowledge. 
                  While offering work on all three major diesel platforms (Duramax, Cummins, Powerstroke), 
                  Dan believes in honest service - if he&apos;s not confident in a repair, he&apos;ll refer you to the right specialist.
                </p>
                <p>
                  Through partnerships like FABMD for custom fabrication work, Specialty Built offers comprehensive 
                  diesel services. Dan also works on gas vehicles when the diesel knowledge applies, always eager to learn 
                  and help where possible.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-primary/10 to-secondary/10 p-8 rounded-lg"
            >
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                    <div className="text-sm text-foreground/70">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Our <span className="text-primary">Values</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              These core values guide everything we do, from simple repairs to complex custom builds
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-background p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                <p className="text-foreground/70">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Meet the <span className="text-secondary">Team</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Our experienced team of diesel specialists brings decades of combined expertise to every project
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-accent rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-sm text-foreground/70 mb-4">{member.experience}</p>
                <div className="space-y-1">
                  {member.specialties.map((specialty, specIndex) => (
                    <span
                      key={specIndex}
                      className="inline-block bg-secondary/10 text-secondary px-3 py-1 rounded-full text-xs font-medium mr-2 mb-2"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Facility */}
      <section className="py-24 bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
                State-of-the-Art <span className="text-primary">Facility</span>
              </h2>
              <div className="space-y-4 text-foreground/80">
                <p>
                  Our 15,000 square foot facility is equipped with the latest diagnostic equipment, 
                  precision tools, and fabrication capabilities to handle any diesel project.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <Wrench className="w-5 h-5 text-secondary mr-3" />
                    Heavy-duty lifts capable of handling the largest trucks
                  </li>
                  <li className="flex items-center">
                    <Wrench className="w-5 h-5 text-secondary mr-3" />
                    Computer-controlled dyno for performance testing
                  </li>
                  <li className="flex items-center">
                    <Wrench className="w-5 h-5 text-secondary mr-3" />
                    Full fabrication shop with welding and machining capabilities
                  </li>
                  <li className="flex items-center">
                    <Wrench className="w-5 h-5 text-secondary mr-3" />
                    Climate-controlled work bays for precision work
                  </li>
                </ul>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-background rounded-lg p-8 text-center"
            >
              <Truck className="w-32 h-32 text-primary mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Visit Our Shop</h3>
              <p className="text-foreground/70 mb-4">
                See our facility and capabilities in person. We welcome tours and consultations.
              </p>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Schedule a Visit
              </motion.a>
            </motion.div>
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
              Ready to Experience the Difference?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join hundreds of satisfied customers who trust Specialty Built for their diesel needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Get Started Today
              </motion.a>
              <motion.a
                href="/services"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-colors"
              >
                View Our Services
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}