import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronLeft, ChevronRight, Ruler, Square, Circle, RectangleHorizontal } from "lucide-react";

interface TemplateSelectionStepProps {
  selectedTemplate: any;
  customDimensions: { length: string; width: string };
  onTemplateSelect: (template: any) => void;
  onDimensionsChange: (dimensions: { length: string; width: string }) => void;
  onNext: () => void;
  onPrev: () => void;
}

const presetTemplates = [
  {
    id: "square-30",
    name: "方形 (30cm x 30cm)",
    type: "基础形状",
    dimensions: { length: 30, width: 30 },
    icon: Square,
    description: "适合大面积图案展示"
  },
  {
    id: "circle-30",
    name: "圆形 (直径 30cm)",
    type: "基础形状", 
    dimensions: { length: 30, width: 30 },
    icon: Circle,
    description: "经典圆形设计"
  },
  {
    id: "rectangle-40-20",
    name: "矩形 (40cm x 20cm)",
    type: "基础形状",
    dimensions: { length: 40, width: 20 },
    icon: RectangleHorizontal,
    description: "适合横向图案布局"
  },
  {
    id: "shoe-patch",
    name: "鞋面饰片 (10cm x 8cm)",
    type: "产品模板",
    dimensions: { length: 10, width: 8 },
    icon: Square,
    description: "鞋面装饰专用规格"
  },
  {
    id: "bag-flap",
    name: "手袋翻盖 (15cm x 12cm)",
    type: "产品模板",
    dimensions: { length: 15, width: 12 },
    icon: RectangleHorizontal,
    description: "手袋翻盖标准尺寸"
  },
  {
    id: "brand-label",
    name: "品牌皮标 (5cm x 3cm)",
    type: "产品模板",
    dimensions: { length: 5, width: 3 },
    icon: RectangleHorizontal,
    description: "品牌标识专用小标签"
  }
];

const TemplateSelectionStep = ({ 
  selectedTemplate, 
  customDimensions, 
  onTemplateSelect, 
  onDimensionsChange, 
  onNext, 
  onPrev 
}: TemplateSelectionStepProps) => {
  const [templateType, setTemplateType] = useState(selectedTemplate?.id || "");

  const handleTemplateSelect = (templateId: string) => {
    setTemplateType(templateId);
    if (templateId === "custom") {
      onTemplateSelect({ 
        id: "custom", 
        name: "自定义尺寸",
        type: "自定义",
        dimensions: { 
          length: parseFloat(customDimensions.length) || 0, 
          width: parseFloat(customDimensions.width) || 0 
        }
      });
    } else {
      const template = presetTemplates.find(t => t.id === templateId);
      if (template) {
        onTemplateSelect(template);
      }
    }
  };

  const handleDimensionChange = (field: "length" | "width", value: string) => {
    const newDimensions = { ...customDimensions, [field]: value };
    onDimensionsChange(newDimensions);
    
    if (templateType === "custom") {
      onTemplateSelect({
        id: "custom",
        name: "自定义尺寸",
        type: "自定义",
        dimensions: { 
          length: parseFloat(newDimensions.length) || 0, 
          width: parseFloat(newDimensions.width) || 0 
        }
      });
    }
  };

  const basicShapes = presetTemplates.filter(t => t.type === "基础形状");
  const productTemplates = presetTemplates.filter(t => t.type === "产品模板");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">选择模板规格</h2>
        <p className="text-gray-600">
          选择预设模板或自定义尺寸来定义您的定制作品规格
        </p>
      </div>

      <RadioGroup value={templateType} onValueChange={handleTemplateSelect}>
        {/* 基础形状 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Square className="h-5 w-5 text-blue-600" />
            基础形状
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {basicShapes.map((template) => {
              const IconComponent = template.icon;
              return (
                <Card 
                  key={template.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    templateType === template.id 
                      ? "border-blue-500 bg-blue-50 shadow-md" 
                      : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                  }`}
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <RadioGroupItem value={template.id} />
                      <IconComponent className="h-5 w-5 text-gray-600" />
                      <span className="font-medium text-gray-900">{template.name}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                    <Badge variant="secondary" className="text-xs">
                      {template.dimensions.length}cm × {template.dimensions.width}cm
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* 产品模板 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Ruler className="h-5 w-5 text-green-600" />
            产品模板
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {productTemplates.map((template) => {
              const IconComponent = template.icon;
              return (
                <Card 
                  key={template.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    templateType === template.id 
                      ? "border-blue-500 bg-blue-50 shadow-md" 
                      : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                  }`}
                  onClick={() => handleTemplateSelect(template.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <RadioGroupItem value={template.id} />
                      <IconComponent className="h-5 w-5 text-gray-600" />
                      <span className="font-medium text-gray-900">{template.name}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                    <Badge variant="secondary" className="text-xs">
                      {template.dimensions.length}cm × {template.dimensions.width}cm
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* 自定义尺寸 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Ruler className="h-5 w-5 text-purple-600" />
            自定义尺寸
          </h3>
          <Card 
            className={`cursor-pointer transition-all duration-200 ${
              templateType === "custom" 
                ? "border-blue-500 bg-blue-50 shadow-md" 
                : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
            }`}
            onClick={() => handleTemplateSelect("custom")}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <RadioGroupItem value="custom" />
                <span className="font-medium text-gray-900">自定义尺寸</span>
                <Badge variant="outline">灵活定制</Badge>
              </div>
              
              {templateType === "custom" && (
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <Label htmlFor="length" className="text-sm font-medium text-gray-700">
                      长度 (cm)
                    </Label>
                    <Input
                      id="length"
                      type="number"
                      placeholder="输入长度"
                      value={customDimensions.length}
                      onChange={(e) => handleDimensionChange("length", e.target.value)}
                      min="1"
                      max="100"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="width" className="text-sm font-medium text-gray-700">
                      宽度 (cm)
                    </Label>
                    <Input
                      id="width"
                      type="number"
                      placeholder="输入宽度"
                      value={customDimensions.width}
                      onChange={(e) => handleDimensionChange("width", e.target.value)}
                      min="1"
                      max="100"
                      className="mt-1"
                    />
                  </div>
                </div>
              )}
              
              <p className="text-sm text-gray-600 mt-3">
                可根据您的需求自定义长度和宽度（最大100cm×100cm）
              </p>
            </CardContent>
          </Card>
        </div>
      </RadioGroup>

      <div className="flex justify-between">
        <Button 
          variant="outline"
          onClick={onPrev}
          className="text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          上一步
        </Button>
        <Button 
          onClick={onNext}
          disabled={!selectedTemplate}
          className="bg-blue-600 hover:bg-blue-700"
        >
          下一步：配置工艺
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default TemplateSelectionStep;
