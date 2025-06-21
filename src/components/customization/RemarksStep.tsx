
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ChevronLeft, MessageSquare, Check } from "lucide-react";

interface RemarksStepProps {
  remarks: string;
  onRemarksChange: (remarks: string) => void;
  onPrev: () => void;
  onComplete: () => void;
}

const RemarksStep = ({ remarks, onRemarksChange, onPrev, onComplete }: RemarksStepProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">其他个性化需求</h2>
        <p className="text-gray-600">
          如有其他特殊工艺要求或注意事项，请在此处详细说明
        </p>
      </div>

      <Card className="border border-gray-200">
        <CardContent className="p-6">
          <div className="space-y-4">
            <Label htmlFor="remarks" className="text-base font-medium text-gray-900 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-600" />
              备注说明
            </Label>
            <Textarea
              id="remarks"
              placeholder="例如：希望图案居中放置、需要特殊包装、有颜色偏好等..."
              value={remarks}
              onChange={(e) => onRemarksChange(e.target.value)}
              className="min-h-[120px] resize-none"
            />
            <div className="text-sm text-gray-500">
              {remarks.length}/500 字符
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <MessageSquare className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">常见备注示例：</p>
              <ul className="space-y-1">
                <li>• 图案位置：希望图案居中/偏左/偏右放置</li>
                <li>• 颜色要求：希望颜色更深/更浅/更鲜艳</li>
                <li>• 包装需求：需要礼品包装/特殊包装要求</li>
                <li>• 交期要求：急单处理/指定送达时间</li>
                <li>• 质量标准：商用级别/收藏级别</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Check className="h-6 w-6 text-green-600" />
            <h3 className="text-lg font-bold text-green-900">配置完成</h3>
          </div>
          <p className="text-green-800 mb-4">
            您已完成所有定制配置步骤！现在可以在右侧预览最终效果并进行下单。
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-green-900">下一步操作：</span>
              <ul className="mt-1 space-y-1 text-green-700">
                <li>• 查看右侧实时预览</li>
                <li>• 确认价格明细</li>
                <li>• 选择下单方式</li>
              </ul>
            </div>
            <div>
              <span className="font-medium text-green-900">温馨提示：</span>
              <ul className="mt-1 space-y-1 text-green-700">
                <li>• 首次定制享费用减免</li>
                <li>• 支持在线支付</li>
                <li>• 专业客服跟进</li>
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
          onClick={onComplete}
          className="bg-green-600 hover:bg-green-700"
        >
          <Check className="h-4 w-4 mr-2" />
          完成配置
        </Button>
      </div>
    </div>
  );
};

export default RemarksStep;
