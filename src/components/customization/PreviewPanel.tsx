
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Image, Palette, Ruler, Settings } from "lucide-react";
import { CustomizationState } from "../CustomizationWorkspace";

interface PreviewPanelProps {
  customizationData: CustomizationState;
}

const PreviewPanel = ({ customizationData }: PreviewPanelProps) => {
  const { uploadedImage, selectedLeather, selectedTemplate, selectedCraft } = customizationData;

  return (
    <Card className="shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 border-b border-gray-100">
        <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
          <Eye className="h-5 w-5 text-blue-600" />
          实时效果预览
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Preview Area */}
        <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-6 relative overflow-hidden border-2 border-gray-200">
          {selectedLeather && (
            <img 
              src={selectedLeather.image} 
              alt="皮料背景"
              className="absolute inset-0 w-full h-full object-cover opacity-80"
            />
          )}
          
          {uploadedImage && (
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <div 
                className={`relative bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-2 ${
                  selectedCraft === "hot-stamping" ? "filter sepia saturate-200 hue-rotate-45" :
                  selectedCraft === "embossed-print" ? "filter grayscale contrast-125" : ""
                }`}
                style={{
                  maxWidth: selectedTemplate?.dimensions ? 
                    `${Math.min(selectedTemplate.dimensions.length, selectedTemplate.dimensions.width) * 8}px` : 
                    "200px",
                  maxHeight: selectedTemplate?.dimensions ? 
                    `${Math.min(selectedTemplate.dimensions.length, selectedTemplate.dimensions.width) * 8}px` : 
                    "200px"
                }}
              >
                <img 
                  src={uploadedImage} 
                  alt="预览图案"
                  className="w-full h-full object-contain rounded"
                />
                {selectedCraft === "embossed-print" && (
                  <div className="absolute inset-0 bg-black/10 rounded mix-blend-multiply"></div>
                )}
              </div>
            </div>
          )}
          
          {!uploadedImage && !selectedLeather && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <Image className="h-12 w-12 mx-auto mb-2" />
                <p className="text-sm">预览区域</p>
                <p className="text-xs">完成配置后显示效果</p>
              </div>
            </div>
          )}
        </div>

        {/* Configuration Summary */}
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 text-base">当前配置</h3>
          
          <div className="space-y-3">
            {uploadedImage ? (
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <Image className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-800">设计图案已上传</span>
                <Badge variant="secondary" className="bg-green-100 text-green-800">✓</Badge>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Image className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">等待上传设计图案</span>
              </div>
            )}

            {selectedLeather ? (
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <Palette className="h-4 w-4 text-green-600" />
                <div className="flex-1">
                  <span className="text-sm text-green-800 font-medium">{selectedLeather.name}</span>
                  <p className="text-xs text-green-600">{selectedLeather.color} · {selectedLeather.texture}</p>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">✓</Badge>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Palette className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">等待选择基础皮料</span>
              </div>
            )}

            {selectedTemplate ? (
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <Ruler className="h-4 w-4 text-green-600" />
                <div className="flex-1">
                  <span className="text-sm text-green-800 font-medium">{selectedTemplate.name}</span>
                  <p className="text-xs text-green-600">
                    {selectedTemplate.dimensions.length}cm × {selectedTemplate.dimensions.width}cm
                  </p>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">✓</Badge>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Ruler className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">等待选择模板规格</span>
              </div>
            )}

            {selectedCraft ? (
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                <Settings className="h-4 w-4 text-green-600" />
                <div className="flex-1">
                  <span className="text-sm text-green-800 font-medium">
                    {selectedCraft === "colorful-screen" ? "彩色丝印" :
                     selectedCraft === "hot-stamping" ? "烫金/烫银" :
                     selectedCraft === "embossed-print" ? "素色压印" : selectedCraft}
                  </span>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">✓</Badge>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Settings className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">等待配置图案工艺</span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PreviewPanel;
