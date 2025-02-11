import { useEffect, useState } from "react";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import { useLocation } from "react-router-dom";

function ForgotPass() {
	const [step, setStep] = useState(1);
	const location = useLocation();

	useEffect(() => {
		if (location.state && location.state.initialStep) {
			console.log("Navigating to initialStep:", location.state.initialStep);
			setStep(location.state.initialStep);
		}
	}, [location.state]);

	return (
		<div>
			{step === 1 && <Step1 setStep={setStep} />}
			{step === 2 && <Step2 setStep={setStep} />}
			{step === 3 && <Step3 setStep={setStep} />}
		</div>
	);
}

export default ForgotPass;
