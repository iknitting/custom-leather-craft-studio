
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronLeft, ChevronRight, Palette, Sparkles, Stamp } from "lucide-react";

interface CraftSelectionStepProps {
  selectedCraft: string;
  onCraftSelect: (craft: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

const craftOptions = [
  {
    id: "colorful-screen",
    name: "彩色丝印",
    description: "将彩色图案印制在皮料表面，色彩鲜艳，层次丰富",
    icon: Palette,
    features: ["色彩还原度高", "适合复杂图案", "持久不褪色"],
    price: 30,
    duration: "3-5个工作日",
    suitable: "适合彩色设计、照片、复杂图案"
  },
  {
    id: "hot-stamping",
    name: "烫金/烫银",
    description: "将带有金属光泽的图案压印在皮料上，呈现高贵典雅的效果",
    icon: Sparkles,
    features: ["金属质感", "高档奢华", "反光效果佳"],
    price: 45,
    duration: "5-7个工作日",
    suitable: "适合LOGO、文字、简单图形"
  },
  {
    id: "embossed-print",
    name: "素色压印",
    description: "无色压印，形成凹陷的图案效果，呈现立体质感",
    icon: Stamp,
    features: ["立体效果", "质感突出", "经典耐用"],
    price: 25,
    duration: "2-4个工作日",
    suitable: "适合简约设计、纹理图案"
  }
];

const CraftSelectionStep = ({ selectedCraft, onCraftSelect, onNext, onPrev }: CraftSelectionStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">设置图案工艺</h2>
        <p className="text-gray-600">
          选择适合您设计的专业工艺，不同工艺将呈现不同的视觉和触感效果
        </p>
      </div>

      <RadioGroup value={selectedCraft} onValueChange={onCraftSelect}>
        <div className="space-y-4">
          {craftOptions.map((craft) => {
            const IconComponent = craft.icon;
            return (
              <Card 
                key={craft.id}
                className={`cursor-pointer transition-all duration-200 ${
                  selectedCraft === craft.id 
                    ? "border-blue-500 bg-blue-50 shadow-lg" 
                    : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                }`}
                onClick={() => onCraftSelect(craft.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      <RadioGroupItem value={craft.id} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <IconComponent className="h-6 w-6 text-blue-600" />
                        <h3 className="text-xl font-bold text-gray-900">{craft.name}</h3>
                        <Badge variant="secondary" className="text-sm">
                          +¥{craft.price}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {craft.description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">工艺特点</h4>
                          <ul className="space-y-1">
                            {craft.features.map((feature, index) => (
                              <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0"></div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">制作周期</h4>
                          <p className="text-sm text-blue-600 font-medium">{craft.duration}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">适用范围</h4>
                          <p className="text-sm text-gray-600">{craft.suitable}</p>
                        </div>
                      </div>
                      
                      {selectedCraft === craft.id && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="flex items-center gap-2 text-green-800">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                            <span className="font-medium">已选择此工艺</span>
                          </div>
                          <p className="text-sm text-green-700 mt-1">
                            定制费用：¥{craft.price}，预计完成时间：{craft.duration}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </RadioGroup>

      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Sparkles className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-medium mb-1">工艺选择建议：</p>
              <ul className="space-y-1">
                <li>• <strong>彩色丝印</strong>：最适合彩色照片和复杂设计</li>
                <li>• <strong>烫金/烫银</strong>：商务LOGO和品牌标识的首选</li>
                <li>• <strong>素色压印</strong>：追求简约质感的理想选择</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

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
          disabled={!selectedCraft}
          className="bg-blue-600 hover:bg-blue-700"
        >
          下一步：添加备注
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default CraftSelectionStep;
