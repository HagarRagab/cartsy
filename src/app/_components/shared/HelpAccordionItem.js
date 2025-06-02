import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/src/components/ui/accordion";

function HelpAccordionItem({ question, answer }) {
    return (
        <AccordionItem value={question}>
            <AccordionTrigger className="text-base">
                Q: {question}
            </AccordionTrigger>
            <AccordionContent className="font-semibold">
                A: {answer}
            </AccordionContent>
        </AccordionItem>
    );
}

export default HelpAccordionItem;
