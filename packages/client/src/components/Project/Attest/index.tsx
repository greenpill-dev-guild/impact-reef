interface ProjectAttestProps {
  projectCreator: boolean;
  badgeholder: boolean;
}
export const ProjectAttest: React.FC<ProjectAttestProps> = ({
  projectCreator,
  badgeholder,
}) => {
  return (
    <>
      <label
        htmlFor="project-attest-drawer"
        className="drawer-button btn btn-primary"
      >
        {projectCreator
          ? "Claim Metrics"
          : badgeholder
            ? "Evaluate"
            : "Endorse"}
      </label>
      <div className="drawer-side">
        <label
          htmlFor="project-attest-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="pt-3 pb-6 h-screen overflow-scroll relative">
          <div>
            <h2>
              {projectCreator
                ? "Claim Metrics"
                : badgeholder
                  ? "Evaluate"
                  : "Endorse"}
            </h2>
            <p>
              {projectCreator
                ? "Be proud of your achievements and help the ecosystem understand the impact you’ve made by submitting an onchain attestation."
                : badgeholder
                  ? "As an evaluator, it’s crucial to assist others and the ecosystem in understanding the impact of a project by submitting an onchain attestation, whether it be a data-driven metric or an endorsement."
                  : "Support this project by submitting an onchain attestation as proof of your endorsement."}
            </p>
          </div>
          <div className="w-full px-4 fixed bottom-0 left-0">
            <button className="w-full" disabled={true}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
