import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface EMICalculatorProps {
  hideHeading?: boolean;
}

const EMICalculator = ({ hideHeading = false }: EMICalculatorProps) => {
  const [emiAmount, setEmiAmount] = useState(25000);
  const [tenure, setTenure] = useState("240"); // months
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanAmount, setLoanAmount] = useState(4000000);

  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: leftRef, isVisible: leftVisible } = useScrollAnimation();
  const { ref: rightRef, isVisible: rightVisible } = useScrollAnimation();

  // EMI Calculation
  const calculateEMI = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const months = parseInt(tenure);

    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const totalAmount = emi * months;
    const totalInterest = totalAmount - principal;

    return {
      emi: Math.round(emi) || 0,
      totalAmount: Math.round(totalAmount) || 0,
      totalInterest: Math.round(totalInterest) || 0,
      principal: principal
    };
  };

  const calculation = calculateEMI();
  const interestPercentage = calculation.totalAmount > 0
    ? (calculation.totalInterest / calculation.totalAmount) * 100
    : 0;

  // Sync emiAmount state when other parameters change so the slider reflects the current calculation
  useEffect(() => {
    const currentEmi = calculation.emi;
    if (emiAmount !== currentEmi) {
      setEmiAmount(currentEmi);
    }
  }, [loanAmount, interestRate, tenure, calculation.emi]);

  return (
    <section id="emi-calculator" className="py-12 lg:py-16 bg-white section-divider">
      <div className="container mx-auto px-4 lg:px-8">
        {!hideHeading && (
          <div className="text-center mb-12" ref={titleRef}>
            <h2
              className="text-3xl lg:text-4xl font-bold text-brand-navy mb-4 transition-all duration-700"
              style={{
                opacity: titleVisible ? 1 : 0,
                transform: titleVisible ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              EMI Calculator
            </h2>
            <div
              className="h-1 bg-brand-blue rounded-full mx-auto mb-6 transition-all duration-700 delay-200"
              style={{ width: titleVisible ? '5rem' : '0' }}
            />
            <p
              className="text-lg text-brand-gray max-w-2xl mx-auto transition-all duration-700 delay-300"
              style={{
                opacity: titleVisible ? 1 : 0,
                transform: titleVisible ? 'translateY(0)' : 'translateY(15px)',
              }}
            >
              Calculate your monthly EMI and plan your home purchase with our easy-to-use calculator
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* EMI Results */}
          <div ref={leftRef}>
            <Card
              className="shadow-card hover:shadow-brand transition-all duration-500 h-full"
              style={{
                opacity: leftVisible ? 1 : 0,
                transform: leftVisible ? 'translateX(0)' : 'translateX(-30px)',
                transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-brand-navy">Your monthly EMI will be</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* EMI Amount Display */}
                <div className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold text-brand-blue mb-2 tabular-nums">
                    ₹{calculation.emi.toLocaleString()}
                  </div>
                  <p className="text-brand-gray">Monthly EMI</p>
                </div>

                {/* Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-brand-light-blue/10 rounded-lg hover:bg-brand-light-blue/15 transition-colors duration-300">
                    <span className="text-brand-gray text-sm">Interest Amount</span>
                    <span className="font-semibold text-brand-navy tabular-nums">₹{calculation.totalInterest.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg hover:bg-green-100/60 transition-colors duration-300">
                    <span className="text-brand-gray text-sm">Principal Amount</span>
                    <span className="font-semibold text-brand-navy tabular-nums">₹{calculation.principal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-brand-blue/10 rounded-lg hover:bg-brand-blue/15 transition-colors duration-300">
                    <span className="text-brand-gray text-sm">Total Repayment</span>
                    <span className="font-semibold text-brand-blue tabular-nums">₹{calculation.totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                {/* Circular Progress */}
                <div className="flex justify-center">
                  <div className="relative w-32 h-32">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="hsl(var(--brand-blue))"
                        strokeWidth="3"
                        strokeDasharray={`${100 - interestPercentage} ${interestPercentage}`}
                        strokeLinecap="round"
                        className="transition-all duration-700"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-brand-blue">
                        {Math.round(100 - interestPercentage)}%
                      </span>
                    </div>
                  </div>
                </div>

                <Button variant="brand" size="lg" className="w-full hover:-translate-y-0.5 transition-all duration-300">
                  Property Value
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Calculator Inputs */}
          <div ref={rightRef}>
            <Card
              className="shadow-card hover:shadow-brand transition-all duration-500 h-full"
              style={{
                opacity: rightVisible ? 1 : 0,
                transform: rightVisible ? 'translateX(0)' : 'translateX(30px)',
                transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.15s',
              }}
            >
              <CardContent className="p-6 lg:p-8 space-y-8">
                {/* EMI Slider */}
                <div className="space-y-3">
                  <Label className="text-base font-medium text-brand-navy">EMI</Label>
                  <div className="space-y-2">
                    <Slider
                      value={[emiAmount]}
                      onValueChange={(value) => {
                        setEmiAmount(value[0]);
                        const monthlyRate = interestRate / 100 / 12;
                        const months = parseInt(tenure);
                        const principal = (value[0] * (Math.pow(1 + monthlyRate, months) - 1)) /
                          (monthlyRate * Math.pow(1 + monthlyRate, months));
                        setLoanAmount(Math.round(principal));
                      }}
                      max={100000}
                      min={5000}
                      step={1000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-brand-gray">
                      <span>₹5,000</span>
                      <span className="font-medium text-brand-blue tabular-nums">₹{emiAmount.toLocaleString()}</span>
                      <span>₹1,00,000</span>
                    </div>
                  </div>
                </div>

                {/* Tenure */}
                <div className="space-y-3">
                  <Label className="text-base font-medium text-brand-navy">Tenure</Label>
                  <Select value={tenure} onValueChange={setTenure}>
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="120">10 years (120 months)</SelectItem>
                      <SelectItem value="180">15 years (180 months)</SelectItem>
                      <SelectItem value="240">20 years (240 months)</SelectItem>
                      <SelectItem value="300">25 years (300 months)</SelectItem>
                      <SelectItem value="360">30 years (360 months)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Amount */}
                <div className="space-y-3">
                  <Label className="text-base font-medium text-brand-navy">Amount</Label>
                  <Input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(parseInt(e.target.value) || 0)}
                    className="h-12 text-lg"
                    placeholder="Enter loan amount"
                  />
                </div>

                {/* Interest Rate */}
                <div className="space-y-3">
                  <Label className="text-base font-medium text-brand-navy">Interest %</Label>
                  <div className="space-y-2">
                    <Slider
                      value={[interestRate]}
                      onValueChange={(value) => setInterestRate(value[0])}
                      max={15}
                      min={5}
                      step={0.1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-brand-gray">
                      <span>5%</span>
                      <span className="font-medium text-brand-blue">{interestRate}%</span>
                      <span>15%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EMICalculator;