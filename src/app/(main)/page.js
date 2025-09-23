import AboutUs from "@/components/AboutUs";
import News from "@/components/News";
import FieldsOfActivity from "@/components/FieldsOfActivity";
import Publications from "@/components/Publications";
import ResearchDirections from "@/components/ResearchDirections";
import SupportingActivities from "@/components/SupportingActivities";
import TeamMembers from "@/components/TeamMembers";
import MissionVision from "@/components/MissionVision";

export default function Home() {
  return (
    <div>
      <AboutUs/>
      <MissionVision/>
      <ResearchDirections/>
      <SupportingActivities/>
      <TeamMembers/>
      <Publications/>
      <News/>
    </div>
  );
}
