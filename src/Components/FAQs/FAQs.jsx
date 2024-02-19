import {useState, useRef} from 'react';
import './FAQs.css';

const reviews = [
    {
        headline: 'Lorem ipsum dolor sit amet consectetur. Ipsum adipiscing cras cras.',
        content: 'Lorem ipsum dolor sit amet consectetur. Habitasse faucibus eget quis consectetur imperdiet. Mauris blandit hendrerit dignissim tempus sollicitudin lectus at feugiat. Vitae dolor nisl tellus praesent. Rhoncus nisl turpis.'
    },
    {
        headline: 'Lorem ipsum dolor sit amet consectetur. Ipsum adipiscing cras cras.',
        content: 'Lorem ipsum dolor sit amet consectetur. Habitasse faucibus eget quis consectetur imperdiet. Mauris blandit hendrerit dignissim tempus sollicitudin lectus at feugiat. Vitae dolor nisl tellus praesent. Rhoncus nisl turpis.'
    },
    {
        headline: 'Lorem ipsum dolor sit amet consectetur. Ipsum adipiscing cras cras.',
        content: 'Lorem ipsum dolor sit amet consectetur. Habitasse faucibus eget quis consectetur imperdiet. Mauris blandit hendrerit dignissim tempus sollicitudin lectus at feugiat. Vitae dolor nisl tellus praesent. Rhoncus nisl turpis.'
    },
    {
        headline: 'Lorem ipsum dolor sit amet consectetur. Ipsum adipiscing cras cras.',
        content: 'Lorem ipsum dolor sit amet consectetur. Habitasse faucibus eget quis consectetur imperdiet. Mauris blandit hendrerit dignissim tempus sollicitudin lectus at feugiat. Vitae dolor nisl tellus praesent. Rhoncus nisl turpis.'
    },
    {
        headline: 'Lorem ipsum dolor sit amet consectetur. Ipsum adipiscing cras cras.',
        content: 'Lorem ipsum dolor sit amet consectetur. Habitasse faucibus eget quis consectetur imperdiet. Mauris blandit hendrerit dignissim tempus sollicitudin lectus at feugiat. Vitae dolor nisl tellus praesent. Rhoncus nisl turpis.'
    },
]

export const FAQs = () => {

    const [active, setActive] = useState(false)
    const contentRef = useRef([])

    const toggleItem = (index) => {
        setActive(active === index ? null : index);
    }


    return (
        <div className="FAQs-container">
            <p className='top-heading'>FAQs</p>
            <p className='heading-text'>Lorem ipsum dolor sit amet consectetur. Proin donec pulvinar malesuada consequat purus integer congue. Pulvinar tincidunt.</p>
            <div className='FAQs-questions'>
                {reviews.map((review, index) => (
                    <div key={index} className={`question-portion ${active === index && 'shadow-xl'}`}>
                        <div class="circle">
                            <div class="question-mark">?</div>
                        </div>
                        <div class="content space-y-4" onClick={() => toggleItem(index)} >
                            <span className='flex justify-between items-center'>
                                <h2 class="bold-text">{review.headline}</h2>
                                <div class="minus-sign"> {active === index ? '-' : '+' } </div>
                            </span>
                            <div ref={(ref) => (contentRef.current[index] = ref)}>
                                {active === index && <p className="long-text">{review.content}</p>}
                            </div>
                        </div>
                    </div>            
                ))}    
            </div>
        </div>
    )
}
  