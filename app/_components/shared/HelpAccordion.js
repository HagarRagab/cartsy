import HelpAccordionItem from "@/app/_components/shared/HelpAccordionItem";
import { helpFAQs } from "@/app/_utils/helper";
import { Accordion } from "@/components/ui/accordion";

function HelpAccordion() {
    return (
        <div className="mt-8">
            {helpFAQs.map((questions) => (
                <div key={questions.title} className="mb-6">
                    <h2 className="font-semibold text-lg mb-2 flex gap-2 items-center">
                        <span className="bg-accent-100 p-3 rounded-full shadow-sm">
                            {questions.icon}
                        </span>{" "}
                        {questions.title}
                    </h2>
                    <Accordion type="single" collapsible className="w-full">
                        {questions.FAQs.map((question) => (
                            <HelpAccordionItem
                                key={question.question}
                                question={question.question}
                                answer={question.answer}
                            />
                        ))}
                    </Accordion>
                </div>
            ))}
        </div>
    );
}

export default HelpAccordion;
