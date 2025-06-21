
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calculator, ShoppingCart, CreditCard, Star, Gift } from "lucide-react";
import { CustomizationState } from "../CustomizationWorkspace";

interface PricingPanelProps {
  customizationData: CustomizationState;
  onAddToCart: () => void;
  onOrderNow: () => void;
}

const PricingPanel = ({ customizationData, onAddToCart, onOrderNow }: PricingPanelProps) => {
  const [isFirstTime] = useState(true); // 模拟首次下单状态，实际应从用户数据获取
  const { selectedLeather, selectedTemplate, selectedCraft } = customizationData;

  // 计算价格
  const calculatePricing = () => {
    let leatherCost = 0;  
    let customizationFee = 0;
    let discountAmount = 0;

    // 计算皮料费用
    if (selectedLeather && selectedTemplate) {
      const area = (selectedTemplate.dimensions.length * selectedTemplate.dimensions.width) / 100; // 转换为平方分米
      leatherCost = Math.round(selectedLeather.price * area * 100) / 100;
    }

    // 计算定制费用
    if (selectedCraft) {
      if (selectedCraft === "colorful-screen") customizationFee = 30;
      else if (selectedCraft === "hot-stamping") customizationFee = 45;
      else if (selectedCraft === "embossed-print") customizationFee = 25;
    }

    // 首次下单减免
    if (isFirstTime && customizationFee > 0) {
      discountAmount = customizationFee;
    }

    const totalAmount = leatherCost + customizationFee - discountAmount;

    return {
      leatherCost,
      customizationFee,
      discountAmount,
      totalAmount: Math.max(totalAmount, 0)
    };
  };

  const pricing = calculatePricing();
  const isComplete = selectedLeather && selectedTemplate && selectedCraft;

  return (
    <Card className="shadow-lg border-0 sticky top-4">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
        <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
          <Calculator className="h-5 w-5 text-blue-600" />
          价格明细
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* 皮料费用 */}
          <div className="flex justify-between items-center">
            <div>
              <span className="text-gray-700">皮料费用</span>
              {selectedLeather && selectedTemplate && (
                <p className="text-xs text-gray-500">
                  {selectedTemplate.dimensions.length}×{selectedTemplate.dimensions.width}cm
                  ({((selectedTemplate.dimensions.length * selectedTemplate.dimensions.width) / 100).toFixed(2)}平方分米)
                </p>
              )}
            </div>
            <span className="font-medium">
              ¥{pricing.leatherCost.toFixed(2)}
            </span>
          </div>

          {/* 定制费用 */}
          <div className="flex justify-between items-center">
            <div>
              <span className="text-gray-700">定制费用</span>
              {selectedCraft && (
                <p className="text-xs text-gray-500">
                  {selectedCraft === "colorful-screen" ? "彩色丝印" :
                   selectedCraft === "hot-stamping" ? "烫金/烫银" :
                   selectedCraft === "embossed-print" ? "素色压印" : ""}
                </p>
              )}
            </div>
            <span className="font-medium">
              ¥{pricing.customizationFee.toFixed(2)}
            </span>
          </div>

          {/* 首次下单减免 */}
          {pricing.discountAmount > 0 && (
            <div className="flex justify-between items-center text-green-600">
              <div className="flex items-center gap-2">
                <Gift className="h-4 w-4" />
                <span>首次定制减免</span>
              </div>
              <span className="font-medium">
                -¥{pricing.discountAmount.toFixed(2)}
              </span>
            </div>
          )}

          <Separator />

          {/* 合计 */}
          <div className="flex justify-between items-center text-lg font-bold">
            <span className="text-gray-900">合计</span>
            <span className="text-blue-600">
              ¥{pricing.totalAmount.toFixed(2)}
            </span>
          </div>

          {/* 首次用户优惠提示 */}
          {isFirstTime && (
            <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-4 w-4 text-orange-600" />
                <span className="font-medium text-orange-800">首次定制优惠</span>
                <Badge className="bg-orange-100 text-orange-800 border-0">
                  限时特惠
                </Badge>
              </div>
              <p className="text-sm text-orange-700">
                恭喜！作为首次定制用户，您享受定制费用全免优惠，
                节省 ¥{pricing.customizationFee.toFixed(2)}
              </p>
            </div>
          )}

          {/* 操作按钮 */}
          <div className="space-y-3 pt-4">
            <Button 
              onClick={onAddToCart}
              disabled={!isComplete}
              variant="outline" 
              className="w-full border-blue-200 text-blue-600 hover:bg-blue-50"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              加入购物车
            </Button>
            
            <Button 
              onClick={onOrderNow}
              disabled={!isComplete}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              立即下单
            </Button>
          </div>

          {!isComplete && (
            <p className="text-xs text-gray-500 text-center mt-3">
              请完成所有配置步骤后进行下单
            </p>
          )}

          {/* 服务保障 */}
          <div className="bg-gray-50 rounded-lg p-4 mt-4">
            <h4 className="font-medium text-gray-900 mb-2 text-sm">服务保障</h4>
            <ul className="space-y-1 text-xs text-gray-600">
              <li>• 专业工艺制作，品质保证</li>
              <li>• 不满意可重做，售后无忧</li>
              <li>• 全程跟踪制作进度</li>
              <li>• 安全包装，物流保护</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PricingPanel;
