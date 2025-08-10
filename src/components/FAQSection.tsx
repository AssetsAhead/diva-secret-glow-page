
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQSection = () => {
  const faqs = [
    {
      question: "What exactly are Diva Secret Stem Cells?",
      answer: "Diva Secret Stem Cells are natural supplements containing powerful compounds that activate your body's own stem cell production and cellular regeneration processes. Each sachet contains 3000mg of premium ingredients that support cellular health and repair."
    },
    {
      question: "How quickly will I see results?",
      answer: "Many users report feeling increased energy within the first week. Significant improvements in overall health typically occur within 2-4 weeks of consistent use. Results may vary based on individual health conditions and consistency of use."
    },
    {
      question: "Are there any side effects?",
      answer: "Diva Secret Stem Cells are made from natural ingredients and are generally well-tolerated. As with any supplement, we recommend consulting your healthcare provider before starting, especially if you have existing medical conditions or take medications."
    },
    {
      question: "How do I take Diva Secret Stem Cells?",
      answer: "Simply mix one sachet with water or your favorite beverage daily. The natural fruit flavors make it enjoyable to take. For best results, take consistently at the same time each day, preferably in the morning."
    },
    {
      question: "What conditions can Diva Secret help with?",
      answer: "Users have reported improvements in energy levels, joint health, diabetes management, immune function, sleep quality, and overall wellness. However, this is not intended to diagnose, treat, cure, or prevent any disease."
    },
    {
      question: "Is there a money-back guarantee?",
      answer: "Yes! We offer a satisfaction guarantee because we believe in our product. If you're not completely satisfied with your results, contact us within 30 days for information about our return policy."
    },
    {
      question: "How does the business opportunity work?",
      answer: "After experiencing the benefits of Diva Secret, you can share it with others and earn income. Our simple sharing program allows you to build a sustainable income while helping others improve their health. Contact us to learn more about becoming a Diva Secret ambassador."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major payment methods through PayFast, including credit cards, debit cards, and EFT. PayFast is South Africa's most trusted payment gateway, ensuring your transactions are secure."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-emerald-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about Diva Secret Stem Cells.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-gray-50 rounded-lg px-6 border-0 shadow-sm hover:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:text-purple-600 py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a 
            href="https://wa.me/27734247729"
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-bold inline-flex items-center space-x-2 transition-colors"
          >
            <span>💬 Chat on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
