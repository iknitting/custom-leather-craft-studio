
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Upload, Check, Star, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ImageUploadStep from "./customization/ImageUploadStep";
import LeatherSelectionStep from "./customization/LeatherSelectionStep";
import TemplateSelectionStep from "./customization/TemplateSelectionStep";
import CraftSelectionStep from "./customization/CraftSelectionStep";
import RemarksStep from "./customization/RemarksStep";
import PreviewPanel from "./customization/PreviewPanel";
import PricingPanel from "./customization/PricingPanel";

interface CustomizationWorkspaceProps {
  onBack: () => void;
}

export interface CustomizationState {
  uploadedImage: string | null;
  selectedLeather: any;
  selectedTemplate: any;
  customDimensions: { length: string; width: string };
  selectedCraft: string;
  remarks: string;
}

const CustomizationWorkspace = ({ onBack }: CustomizationWorkspaceProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [customizationData, setCustomizationData] = useState<CustomizationState>({
    uploadedImage: null,
    selectedLeather: null,
    selectedTemplate: null,
    customDimensions: { length: "", width: "" },
    selectedCraft: "",
    remarks: ""
  });

  const updateCustomization = useCallback((updates: Partial<CustomizationState>) => {
    setCustomizationData(prev => ({ ...prev, ...updates }));
  }, []);

  const steps = [
    { id: 1, title: "上传设计图案", completed: !!customizationData.uploadedImage },
    { id: 2, title: "选择基础皮料", completed: !!customizationData.selectedLeather },
    { id: 3, title: "选择模板规格", completed: !!customizationData.selectedTemplate },
    { id: 4, title: "配置图案工艺", completed: !!customizationData.selectedCraft },
    { id: 5, title: "添加备注说明", completed: true }
  ];

  const handleAddToCart = () => {
    toast({
      title: "已添加到购物车",
      description: "您的定制商品已成功添加到购物车",
    });
  };

  const handleOrderNow = () => {
    toast({
      title: "订单创建成功",
      description: "正在跳转到支付页面...",
    });
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ImageUploadStep
            uploadedImage={customizationData.uploadedImage}
            onImageUpload={(image) => updateCustomization({ uploadedImage: image })}
            onNext={() => setCurrentStep(2)}
          />
        );
      case 2:
        return (
          <LeatherSelectionStep
            selectedLeather={customizationData.selectedLeather}
            onLeatherSelect={(leather) => updateCustomization({ selectedLeather: leather })}
            onNext={() => setCurrentStep(3)}
            onPrev={() => setCurrentStep(1)}
          />
        );
      case 3:
        return (
          <TemplateSelectionStep
            selectedTemplate={customizationData.selectedTemplate}
            customDimensions={customizationData.customDimensions}
            onTemplateSelect={(template) => updateCustomization({ selectedTemplate: template })}
            onDimensionsChange={(dimensions) => updateCustomization({ customDimensions: dimensions })}
            onNext={() => setCurrentStep(4)}
            onPrev={() => setCurrentStep(2)}
          />
        );
      case 4:
        return (
          <CraftSelectionStep
            selectedCraft={customizationData.selectedCraft}
            onCraftSelect={(craft) => updateCustomization({ selectedCraft: craft })}
            onNext={() => setCurrentStep(5)}
            onPrev={() => setCurrentStep(3)}
          />
        );
      case 5:
        return (
          <RemarksStep
            remarks={customizationData.remarks}
            onRemarksChange={(remarks) => updateCustomization({ remarks })}
            onPrev={() => setCurrentStep(4)}
            onComplete={() => {
              toast({
                title: "定制配置完成",
                description: "您可以在右侧查看预览效果并进行下单",
              });
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-stone-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={onBack}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回主页
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-blue-600" />
                个性化定制专区
              </h1>
            </div>
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
              <Star className="h-3 w-3 mr-1" />
              首次定制享费用减免
            </Badge>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div 
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    step.completed
                      ? "bg-blue-600 border-blue-600 text-white"
                      : currentStep === step.id
                      ? "border-blue-600 text-blue-600 bg-blue-50"
                      : "border-gray-300 text-gray-400"
                  }`}
                >
                  {step.completed ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    currentStep === step.id ? "text-blue-600" : 
                    step.completed ? "text-green-600" : "text-gray-500"
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`ml-8 h-px w-16 ${
                    step.completed ? "bg-blue-600" : "bg-gray-300"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Panel - Configuration */}
          <div className="lg:col-span-7">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
                <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  步骤 {currentStep} / {steps.length}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                {renderCurrentStep()}
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Preview & Pricing */}
          <div className="lg:col-span-5 space-y-6">
            <PreviewPanel customizationData={customizationData} />
            <PricingPanel 
              customizationData={customizationData}
              onAddToCart={handleAddToCart}
              onOrderNow={handleOrderNow}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationWorkspace;
