import { Card, CardBody, CardText, CardTitle } from "reactstrap";

const Rules = () => {
    return (
        <>
            <h1>Rules</h1>
            <Card>
                <CardBody>
                    <CardTitle tag="h3">Game Rules</CardTitle>
                    <CardText>
                        <p>Players are expected to be courteous to each other and usual tennis ettiquette.</p>
                        <ul>
                            <li>If a ball lands on the line, it is considered in.</li>
                            <li>If the player touches or catches the ball before it lands, the player loses the point regardless if the ball was going out.</li>
                            <li>It is the players' responsiblity during the game to call a "let" if there is an interruption to play.  This includes events such as a ball or player coming into the court.  A let cannot be called after the point is over. </li>
                            <li>If a player fails to show up at the designated match time, a forfeit can be claimed after 15 minutes</li>
                            <li>No visitors on the courts during matches</li>
                        </ul>
                    </CardText>
                </CardBody>
            </Card>
            <Card className="mt-3">
                <CardBody>
                    <CardTitle tag="h3">Match Scoring</CardTitle>
                    <CardText>
                        <p>Match scoring follows typical tennis scores (15, 30, 40).  After deuce (40-40), advantage scoring is to be used.</p>
                        <p>For set tiebreaks, a Coman tiebreak should be used.  Players change sides after the first point and then every four points thereafter.  The first player to reach 7 points with a 2 point gap wins.</p>
                        <p>If players split the first and second sets, they have the option to play a 10-point super tiebreak (also following Coman tiebreak rules) or a full third set.  It's recommended to play a super tie break to complete the match within the allotted time, but this is at players' discretion.</p>
                        <p>When changing sides during a tiebreak, a break is not allowed.  Play is continuous.</p>
                    </CardText>
                </CardBody>
            </Card>

            <Card className="mt-3">
                <CardBody>
                    <CardTitle tag="h3">League Play</CardTitle>
                    <CardText>
                        <ul>
                            <li>A player is awarded 3 points for each match won in straight sets.  If a player wins but loses a set, he is awarded 2 points and the winner is awarded 1 point.  If a player loses in straight sets, he is awarded no points.</li>
                            <li>If a player cannot attend his match at the regularly scheduled time, he is responsible for finding a another reasonable match time with the opponent.  If the players cannot agree upon a time, a substitute player must be found</li>
                            <li>If a player must use a substitute and the substitute wins the match, the player is only allowed to win a max of 1 point.</li>
                            <li>The first and second place finishers in a league are allowed to move up to the next league, provided there is a spot open.</li>
                            <li>Prizes are given to the first and second place finishers if the league has a full roster.  If the league has less than 8 players/teams, only the first place prize is awarded.</li>
                        </ul>
                    </CardText>
                </CardBody>
            </Card>
        </>
    );
}

export default Rules;