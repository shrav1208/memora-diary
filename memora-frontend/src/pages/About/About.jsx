import { Navbar } from '../../components/Navbar';
import styles from './About.module.css'
import developerImage from '../../assets/developer-image.jpeg'
import backButton from '../../assets/back-button.svg'
import { useBodyClass } from '../../utils/useBodyClass';

export const About = () => {

  useBodyClass('about-body');

    return (
        <>
            <Navbar />
            <div className={styles['back-button']}>
                <img src={backButton} alt='back button' />
            </div>
            <div className={styles['container']}>
                <div className={styles['about-container']}>
                    <div className={styles['about-content']}>
                        <p className={styles['developer-heading']}>About the Developer</p>
                        <p className={styles['developer-info']}>This diary project was created with the vision of combining simplicity and creativity in a digital space. As the developer, I wanted to build something more than just a note-taking tool, it’s meant to be a personal companion where thoughts, emotions, and memories can be stored with ease. Every feature, from the writing interface to the design details, has been thoughtfully crafted to give users a space that feels both private and inspiring.

                            <br /><br />I come from a background in web development and design, with a strong interest in creating applications that are both functional and aesthetically pleasing. Working on this project has been a way to sharpen my skills in front-end technologies, UI/UX design, and user-centered development practices. My aim was to make the experience seamless, whether someone wants to quickly jot down a thought or spend time reflecting deeply.

                            <br /><br />This project is also a reflection of my learning journey as a developer. It’s a space where I experimented, improved, and brought together different skills, from coding to design, to create something meaningful. The hope is that this diary doesn’t just serve as an app, but as a tool that encourages self-expression and mindfulness for anyone who uses it.</p>
                    </div>

                    <div className={styles['developer-image']}>
                        <img src={developerImage} alt='developer image' />
                    </div>
                </div>
            </div>
        </>
    );
}