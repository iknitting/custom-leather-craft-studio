
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Image, AlertCircle, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadStepProps {
  uploadedImage: string | null;
  onImageUpload: (image: string) => void;
  onNext: () => void;
}

const ImageUploadStep = ({ uploadedImage, onImageUpload, onNext }: ImageUploadStepProps) => {
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (!file.type.match(/^image\/(jpeg|jpg|png|svg\+xml)$/)) {
      toast({
        title: "文件格式不支持",
        description: "请上传 JPG、PNG 或 SVG 格式的图片文件",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "文件过大",
        description: "图片文件大小不能超过 10MB",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onImageUpload(e.target.result as string);
        toast({
          title: "图片上传成功",
          description: "您的设计图案已成功上传",
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const removeImage = () => {
    onImageUpload("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">上传您的设计图案</h2>
        <p className="text-gray-600">
          为保证最佳打印效果，请上传300dpi以上分辨率的高清图片
        </p>
      </div>

      {!uploadedImage ? (
        <Card 
          className={`border-2 border-dashed transition-all duration-200 cursor-pointer ${
            isDragging 
              ? "border-blue-500 bg-blue-50" 
              : "border-gray-300 hover:border-gray-400"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Upload className={`h-12 w-12 mb-4 ${
              isDragging ? "text-blue-500" : "text-gray-400"
            }`} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {isDragging ? "松开以上传文件" : "点击上传或拖拽文件到此处"}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              支持 JPG、PNG、SVG 格式，最大 10MB
            </p>
            <Button variant="outline" className="mt-2">
              <Upload className="h-4 w-4 mr-2" />
              选择文件
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="relative flex-shrink-0">
                <img 
                  src={uploadedImage} 
                  alt="上传的设计图案" 
                  className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
                  onClick={removeImage}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Image className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-gray-900">图片上传成功</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  您的设计图案已准备就绪，可以进行下一步操作
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  重新选择
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/svg+xml"
        onChange={handleFileInputChange}
        className="hidden"
      />

      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">上传建议：</p>
              <ul className="space-y-1">
                <li>• 建议使用300dpi以上的高分辨率图片</li>
                <li>• 避免使用过于复杂的细节，确保打印清晰度</li>
                <li>• PNG格式支持透明背景，效果更佳</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button 
          onClick={onNext}
          disabled={!uploadedImage}
          className="bg-blue-600 hover:bg-blue-700"
        >
          下一步：选择皮料
        </Button>
      </div>
    </div>
  );
};

export default ImageUploadStep;
