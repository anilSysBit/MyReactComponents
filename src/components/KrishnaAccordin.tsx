import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const NestedAccordion = () => {
    // Define your accordion data in an array of objects
    const accordionData = [
        {
            title: 'Accordion 1',
            content: [
                {
                    type: 'item',
                    content: 'Nested item 1'
                },
                {
                    type: 'accordion',
                    title: 'Nested Accordion 1',
                    content: [
                        {
                            type: 'item',
                            content: 'Nested item 1'
                        },
                        {
                            type: 'item',
                            content: 'Nested item 2'
                        }
                    ]
                }
            ]
        },
        {
            title: 'Accordion 2',
            content: [
                {
                    type: 'item',
                    content: 'Nested item 1'
                },
                {
                    type: 'accordion',
                    title: 'Nested Accordion 2',
                    content: [
                        {
                            type: 'item',
                            content: 'Nested item 1'
                        }
                    ]
                }
            ]
        },
        // Add more accordion items as needed
    ];

    const renderAccordionContent = (content:any) => {
        return content.map((item:any, index:number) => {
            if (item.type === 'item') {
                return <Typography key={index}>{item.content}</Typography>;
            } else if (item.type === 'accordion') {
                return (
                    <Accordion key={index}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>{item.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {renderAccordionContent(item.content)}
                        </AccordionDetails>
                    </Accordion>
                );
            }
            return null;
        });
    };

    return (
        <div>
            {accordionData.map((item, index) => (
                <Accordion key={index}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{item.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {renderAccordionContent(item.content)}
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
}

export default NestedAccordion;
