import { Card, CardBody } from "reactstrap";

const About = () => {
    return (
        <>
            <Card>
                <CardBody>
                    <h1>About</h1>
                    <p>My name is Bill Huynh and this site is a personal project of mine primarily to learn React.  It's still very much under construction but if you have any feedback or suggestions, I would love to hear from you!</p>
                    
                    <h3>Bill Huynh</h3>
                    <p className="text-muted">
                        Page Creator<br/>
                        <a href="mailto:billhokc@gmail.com">billhokc@gmail.com</a>
                    </p>
                </CardBody>
            </Card>
            
        </>
    );
}

export default About;