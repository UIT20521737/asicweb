import AboutUs from "@/components/AboutUs";
import Activities from "@/components/Activities";
import FieldsOfActivity from "@/components/FieldsOfActivity";
import Publications from "@/components/Publications";
import ResearchDirections from "@/components/ResearchDirection";
import SupportingActivities from "@/components/SupportingActivities";
import TeamMembers from "@/components/TeamMembers";
import VisionMission from "@/components/VisionMission";

export default function Home() {
  return (
    <div>
      <AboutUs/>
      <SupportingActivities/>
      <TeamMembers/>
      <Publications/>
      <Activities/>
    </div>
  );
}
