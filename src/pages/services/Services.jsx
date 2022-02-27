import React from 'react'
import { AiFillDollarCircle, AiOutlineMobile } from 'react-icons/ai'
import { BsBullseye, BsCodeSlash, BsPaintBucket, BsSearch } from 'react-icons/bs'
import './services.css'

const cards = [
    {
        icon: <BsCodeSlash />,
        head: 'Our Api',
        des: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit quos, cupiditate quis numquam consequatur maiores atque debitis non eum nihil explicabo! Ipsum optio cumque omnis enim non, adipisci tempore ea.'
    },
    {
        icon: <BsPaintBucket />,
        head: 'Creative Design',
        des: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit quos, cupiditate quis numquam consequatur maiores atque debitis non eum nihil explicabo! Ipsum optio cumque omnis enim non, adipisci tempore ea.'
    },
    {
        icon: <AiOutlineMobile />,
        head: 'Web Design',
        des: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit quos, cupiditate quis numquam consequatur maiores atque debitis non eum nihil explicabo! Ipsum optio cumque omnis enim non, adipisci tempore ea.'
    },
    {
        icon: <BsSearch />,
        head: 'Explore ',
        des: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit quos, cupiditate quis numquam consequatur maiores atque debitis non eum nihil explicabo! Ipsum optio cumque omnis enim non, adipisci tempore ea.'
    },
    {
        icon: <BsBullseye />,
        head: 'New Challenges',
        des: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit quos, cupiditate quis numquam consequatur maiores atque debitis non eum nihil explicabo! Ipsum optio cumque omnis enim non, adipisci tempore ea.'
    },
    {
        icon: <AiFillDollarCircle />,
        head: 'Earn Money',
        des: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit quos, cupiditate quis numquam consequatur maiores atque debitis non eum nihil explicabo! Ipsum optio cumque omnis enim non, adipisci tempore ea.'
    }
]

const Services = () => {
    return (
        <div className='crypto__services'>
            <h1 className='crypto__services-heading'><span>Services</span></h1>
            <div className="crypto__services-box-container">
                { cards.map((card)=>(
                <div className="crypto__services-box" key={card.head}>
                    <div className="crypto__services-box-icon">{card.icon}</div>
                    <h3>{card.head}</h3>
                    <p>{card.des}</p>
                </div> 
                ))
                }
            </div>
        </div>
    )
}

export default Services
