"use client";

import { useState } from "react";
import { contactFaqs } from "./contactFaqData";

export function ContactFaq() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="space-y-4">
                {contactFaqs.map((faq, index) => {
                    const isOpen = openIndex === index;
                    return (
                        <div
                            key={index}
                            className="border border-white/10 rounded-xl overflow-hidden bg-white/[0.01] backdrop-blur-sm transition-all"
                        >
                            <button
                                onClick={() => setOpenIndex(isOpen ? null : index)}
                                className="w-full flex items-center justify-between p-5 text-left font-bold text-white hover:bg-white/[0.02] transition-colors gap-4"
                            >
                                <span className="text-base md:text-lg">{faq.question}</span>
                                <span className={`text-secondary text-xl transform transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
                                    ＋
                                </span>
                            </button>

                            <div
                                className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                            >
                                <div className={`overflow-hidden transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}>
                                    <div className="p-5 pt-0 border-t border-white/5 text-sm md:text-base text-white/70 leading-relaxed whitespace-pre-line">
                                        {faq.answer}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}