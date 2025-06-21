
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Palette, Check, ChevronLeft, ChevronRight } from "lucide-react";

interface LeatherSelectionStepProps {
  selectedLeather: any;
  onLeatherSelect: (leather: any) => void;
  onNext: () => void;
  onPrev: () => void;
}

const mockLeathers = [
  {
    id: 1,
    name: "意大利进口头层牛皮",
    code: "IT-001",
    color: "黑色",
    texture: "细纹",
    price: 180,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=400&h=300",
    description: "意大利进口优质头层牛皮，手感柔软，纹理自然"
  },
  {
    id: 2,
    name: "法国羊皮",
    code: "FR-002", 
    color: "棕色",
    texture: "光面",
    price: 220,
    image: "https://images.unsplash.com/photo-1558618666-fbd2c019cd75?auto=format&fit=crop&w=400&h=300",
    description: "法国进口羊皮，质地细腻，光泽度佳"
  },
  {
    id: 3,
    name: "疯马皮",
    code: "CN-003",
    color: "复古棕",
    texture: "油蜡面",
    price: 160,
    image: "https://images.unsplash.com/photo-1506629905607-d31e94bb9729?auto=format&fit=crop&w=400&h=300",
    description: "经典疯马皮，做旧效果自然，越用越有韵味"
  },
  {
    id: 4,
    name: "鳄鱼纹牛皮",
    code: "CN-004",
    color: "黑色",
    texture: "鳄鱼纹",
    price: 200,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&h=300",
    description: "精致鳄鱼纹压印，质感高档，商务首选"
  },
  {
    id: 5,
    name: "植鞣牛皮",
    code: "CN-005",
    color: "原色",
    texture: "自然纹",
    price: 140,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=400&h=300",
    description: "天然植鞣工艺，环保健康，可塑性强"
  },
  {
    id: 6,
    name: "小牛皮",
    code: "IT-006",
    color: "米白色",
    texture: "细腻光面",
    price: 280,
    image: "https://images.unsplash.com/photo-1594736797933-d0c9609f8d70?auto=format&fit=crop&w=400&h=300",
    description: "意大利小牛皮，触感顺滑，高端品质"
  }
];

const LeatherSelectionStep = ({ selectedLeather, onLeatherSelect, onNext, onPrev }: LeatherSelectionStepProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleLeatherSelect = (leather: any) => {
    onLeatherSelect(leather);
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">选择基础皮料</h2>
        <p className="text-gray-600">
          从我们精选的优质皮料中选择一款作为您定制作品的基础材质
        </p>
      </div>

      {!selectedLeather ? (
        <Card className="border-2 border-dashed border-gray-300">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Palette className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              请选择基础皮料
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              点击下方按钮从皮料中心选择您喜欢的材质
            </p>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Palette className="h-4 w-4 mr-2" />
                  从皮料中心选择
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl">选择基础皮料</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {mockLeathers.map((leather) => (
                    <Card 
                      key={leather.id} 
                      className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-transparent hover:border-blue-200"
                      onClick={() => handleLeatherSelect(leather)}
                    >
                      <CardContent className="p-4">
                        <img 
                          src={leather.image} 
                          alt={leather.name}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium text-gray-900 text-sm">{leather.name}</h4>
                            <Badge variant="secondary" className="text-xs">{leather.code}</Badge>
                          </div>
                          <div className="text-xs text-gray-600 space-y-1">
                            <div>颜色：{leather.color}</div>
                            <div>纹理：{leather.texture}</div>
                          </div>
                          <div className="text-blue-600 font-bold text-sm">
                            ¥{leather.price}/平方分米
                          </div>
                          <p className="text-xs text-gray-500 line-clamp-2">
                            {leather.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      ) : (
        <Card className="border border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="relative flex-shrink-0">
                <img 
                  src={selectedLeather.image} 
                  alt={selectedLeather.name}
                  className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-gray-900">{selectedLeather.name}</span>
                  <Badge variant="secondary">{selectedLeather.code}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                  <div>颜色：{selectedLeather.color}</div>
                  <div>纹理：{selectedLeather.texture}</div>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {selectedLeather.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="text-blue-600 font-bold">
                    ¥{selectedLeather.price}/平方分米
                  </div>
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        重新选择
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-xl">选择基础皮料</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        {mockLeathers.map((leather) => (
                          <Card 
                            key={leather.id} 
                            className={`cursor-pointer hover:shadow-lg transition-all duration-200 border-2 ${
                              selectedLeather?.id === leather.id 
                                ? "border-green-500 bg-green-50" 
                                : "border-transparent hover:border-blue-200"
                            }`}
                            onClick={() => handleLeatherSelect(leather)}
                          >
                            <CardContent className="p-4 relative">
                              {selectedLeather?.id === leather.id && (
                                <div className="absolute top-2 right-2 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                                  <Check className="h-3 w-3 text-white" />
                                </div>
                              )}
                              <img 
                                src={leather.image} 
                                alt={leather.name}
                                className="w-full h-32 object-cover rounded-lg mb-3"
                              />
                              <div className="space-y-2">
                                <div className="flex justify-between items-start">
                                  <h4 className="font-medium text-gray-900 text-sm">{leather.name}</h4>
                                  <Badge variant="secondary" className="text-xs">{leather.code}</Badge>
                                </div>
                                <div className="text-xs text-gray-600 space-y-1">
                                  <div>颜色：{leather.color}</div>
                                  <div>纹理：{leather.texture}</div>
                                </div>
                                <div className="text-blue-600 font-bold text-sm">
                                  ¥{leather.price}/平方分米
                                </div>
                                <p className="text-xs text-gray-500 line-clamp-2">
                                  {leather.description}
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

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
          disabled={!selectedLeather}
          className="bg-blue-600 hover:bg-blue-700"
        >
          下一步：选择模板
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default LeatherSelectionStep;
