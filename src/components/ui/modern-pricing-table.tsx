"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, Star } from "lucide-react"
import { AuroraText } from "@/components/ui/aurora-text"

export interface Plan {
    title: string
    price: {
        monthly: number
        yearly: number
    }
    description: string
    features: string[]
    ctaText: string
    ctaHref: string
    isFeatured?: boolean
}

interface PricingTableProps {
    plans: Plan[]
}

const PricingTable: React.FC<PricingTableProps> = ({ plans }) => {
    const [isYearly, setIsYearly] = useState(false)

    // Simple check icon for all features
    const getFeatureIcon = () => {
        return <Check className="size-3 text-foreground" />
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    }

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 20,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1
        }
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-8 py-6 space-y-16">
            {/* Header with Toggle */}
            <motion.div
                className="text-center space-y-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="space-y-4">
                    <motion.h1
                        className="text-4xl md:text-5xl font-bold text-foreground"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                    >
                        Pricing
                    </motion.h1>
                    <motion.p
                        className="text-lg text-muted-foreground max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        Choose the best plan for your photo collection. Save more with yearly billing.
                    </motion.p>
                </div>

                {/* Billing Toggle */}
                <motion.div
                    className="flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    <Tabs
                        value={isYearly ? "yearly" : "monthly"}
                        onValueChange={(value) => setIsYearly(value === "yearly")}
                    >
                        <TabsList className="grid grid-cols-2 w-[400px] h-12 cursor-pointer shadow-sm border border-black/10 bg-gray-200 p-1">
                            <TabsTrigger value="monthly" className="text-base font-medium cursor-pointer h-full">Monthly</TabsTrigger>
                            <TabsTrigger value="yearly" className="text-base font-medium flex items-center justify-center gap-2 cursor-pointer h-full">
                                Yearly
                                <AuroraText className="text-xs font-bold uppercase">-20%</AuroraText>
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </motion.div>
            </motion.div>

            {/* Pricing Cards */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {plans.map((plan, index) => (
                    <motion.div
                        key={plan.title}
                        variants={cardVariants}
                        className="relative h-full"
                    >
                        {/* Featured Badge */}
                        {plan.isFeatured && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                                className="absolute -top-7 inset-x-0 mx-auto z-10 w-fit"
                            >
                                <div className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg">
                                    <Star className="size-3 fill-current" />
                                    Most Popular
                                </div>
                            </motion.div>
                        )}

                        <div className={`
              relative flex flex-col h-full p-8 rounded-xl border-2 transition-all duration-300
              ${plan.isFeatured
                                ? 'border-black bg-white shadow-xl scale-105'
                                : 'border-gray-200 bg-white'
                            }
            `}>
                            {/* Plan Header */}
                            <div className="text-center space-y-4 mb-8">
                                <h3 className="text-2xl font-bold text-foreground">{plan.title}</h3>
                                <p className="text-muted-foreground">{plan.description}</p>

                                {/* Price - Direct Rendering for "Normal" Look */}
                                <div className="space-y-2">
                                    <div className="flex items-baseline justify-center gap-1 py-4">
                                        <span className="text-3xl font-bold text-black">$</span>
                                        <span className="text-6xl font-black tracking-tight text-black">
                                            {isYearly ? Math.round(plan.price.yearly / 12) : plan.price.monthly}
                                        </span>
                                        <span className="text-lg text-gray-400 font-medium">/month</span>
                                    </div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-sm text-muted-foreground flex items-center justify-center gap-2"
                                    >
                                        <span>{isYearly ? `billed yearly` : `billed monthly`}</span>
                                        {isYearly && (
                                            <motion.span
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium"
                                            >
                                                Save ${(plan.price.monthly * 12) - plan.price.yearly}
                                            </motion.span>
                                        )}
                                    </motion.div>
                                </div>
                            </div>

                            {/* Features List - Flex Grow to push button down */}
                            <div className="space-y-4 mb-8 flex-1">
                                {plan.features.map((feature, featureIndex) => (
                                    <motion.div
                                        key={feature}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.6 + index * 0.1 + featureIndex * 0.05 }}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                                            {getFeatureIcon()}
                                        </div>
                                        <span className="text-sm text-foreground">{feature}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 + index * 0.1 }}
                            >
                                <Button
                                    asChild
                                    variant={plan.isFeatured ? "default" : "outline"}
                                    size="lg"
                                    className={`w-full ${plan.isFeatured ? 'bg-black text-white hover:bg-black/90' : 'border-black text-black hover:bg-black/5'}`}
                                >
                                    <a href={plan.ctaHref}>
                                        {plan.ctaText}
                                    </a>
                                </Button>
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}

export default PricingTable;
