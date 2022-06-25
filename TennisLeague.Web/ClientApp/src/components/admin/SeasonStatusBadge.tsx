import { Badge } from "reactstrap"
import { SeasonStatus } from "../../models/SeasonStatus"
import { SeasonStatuses } from "../../models/SeasonStatusEnum"

type Prop = {
    statuses: SeasonStatus[],
    seasonStatusId: number
}

const SeasonStatusBadge = (props: Prop) => {
    const {statuses, seasonStatusId} = props;

    const getStatusLabel = (): string => {
        if (!statuses || statuses.length === 0 || !seasonStatusId) return;
        
        if (seasonStatusId === 2) {
            return "Open Registration";
        } else {
            return statuses.find(status => status.id === seasonStatusId)?.status;
        }
    }
    
    const determineStatusColor = (seasonStatusId: number): string => {
        switch(seasonStatusId) {
            case SeasonStatuses.New:
                return "secondary";
            case SeasonStatuses.OpenRegisration:
                return "warning";
            case SeasonStatuses.Active:
                return "info";
            case SeasonStatuses.Completed:
                return "success";
        }
    }

    return (
        <Badge color={determineStatusColor(seasonStatusId)}>{getStatusLabel()}</Badge>
    )
}

export default SeasonStatusBadge