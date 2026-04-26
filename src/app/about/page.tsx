'use client'

import { motion } from 'framer-motion'
import { Users, Award, Target, Heart } from 'lucide-react'
import Header from '../../components/Header'

export default function About() {
  const stats = [
    { number: "4+", label: "Years of Diesel Experience" },
    { number: "3", label: "Platforms Covered" },
    { number: "100%", label: "Hand-Picked Lineup" },
    { number: "<24h", label: "Avg. Support Reply" }
  ]

  const team = [
    {
      name: "Dan",
      role: "Owner & Curator",
      experience: "4+ years hands-on diesel experience",
      specialties: ["Duramax Knowledge", "Powerstroke Knowledge", "Cummins Knowledge"]
    }
  ]

  const values = [
    {
      icon: Heart,
      title: "Passion",
      description: "We live and breathe diesel performance. Every product earns its spot in the lineup."
    },
    {
      icon: Award,
      title: "Quality",
      description: "We never compromise. Your diesel deserves parts and gear built to last."
    },
    {
      icon: Users,
      title: "Community",
      description: "We're part of the diesel community — supporting enthusiasts, builders, and shops alike."
    },
    {
      icon: Target,
      title: "Curation",
      description: "We only sell what we'd run on our own truck. No filler, no gimmicks."
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
              The story behind the parts and apparel — and the diesel mind picking what goes on the shelf.
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
                  Specialty Built started with four years of hands-on diesel work — bulletproofing 6.0 Powerstrokes
                  and getting elbow-deep in Duramax and Cummins builds. That experience is what shaped the lineup
                  you see in the shop today.
                </p>
                <p>
                  Dan&apos;s background as a Duramax specialist means every part on the site has been chosen with
                  builders in mind. We cover all three major diesel platforms — Duramax, Cummins, and Powerstroke —
                  with parts that hold up under real-world use, not just spec sheets.
                </p>
                <p>
                  Specialty Built is now strictly an online parts and apparel shop. No services, no installs — just
                  curated gear, fast shipping, and straight answers when you have a question. If we wouldn&apos;t put
                  it on our own truck, you won&apos;t find it on the site.
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
              What guides what we put in the shop and how we treat every customer.
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
              Meet <span className="text-secondary">Dan</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              The diesel mind behind every product on the shelf — handpicking what makes the cut.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 max-w-md mx-auto gap-8">
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

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Build Something?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Curated diesel performance parts and Specialty Built apparel — shipped fast, picked for builders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="/shop?category=parts"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Shop Parts
              </motion.a>
              <motion.a
                href="/shop?category=apparel"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-colors"
              >
                Shop Apparel
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}