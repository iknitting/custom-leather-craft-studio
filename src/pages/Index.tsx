
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Palette, Upload, Settings, Eye } from "lucide-react";
import CustomizationWorkspace from "@/components/CustomizationWorkspace";

const Index = () => {
  const [showCustomization, setShowCustomization] = useState(false);

  if (showCustomization) {
    return <CustomizationWorkspace onBack={() => setShowCustomization(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-stone-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <div className="text-2xl font-bold text-gray-900">皮料供应平台</div>
              <div className="hidden md:flex space-x-6">
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">首页</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">产品中心</a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">新闻资讯</a>
                <button 
                  onClick={() => setShowCustomization(true)}
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors border-b-2 border-blue-600"
                >
                  个性化定制专区
                </button>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">订单中心</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">登录</Button>
              <Button size="sm">注册</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge className="bg-blue-500/20 text-blue-100 border-blue-400">
                全新功能上线
              </Badge>
              <h1 className="text-5xl font-bold leading-tight">
                个性化定制专区
                <span className="block text-blue-200 text-3xl mt-2">
                  C2M定制，让创意触手可及
                </span>
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                上传您的设计图案，选择优质皮料，配置专业工艺，实时预览效果。
                从创意到成品，只需几步操作。首次定制享受费用减免！
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6"
                  onClick={() => setShowCustomization(true)}
                >
                  开始定制 <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
                >
                  观看演示
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <img 
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=600&h=400" 
                  alt="定制预览界面"
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-white/90">
                    <Upload className="h-5 w-5" />
                    <span>上传设计图案</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/90">
                    <Palette className="h-5 w-5" />
                    <span>选择基础皮料</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/90">
                    <Settings className="h-5 w-5" />
                    <span>配置工艺选项</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/90">
                    <Eye className="h-5 w-5" />
                    <span>实时效果预览</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              为什么选择我们的定制服务
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              专业的B2B皮料供应经验，结合先进的C2M定制技术，为您提供一站式个性化解决方案
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Upload className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">简单上传</h3>
                <p className="text-gray-600 leading-relaxed">
                  支持JPG、PNG、SVG格式，建议上传300dpi以上高清图片，确保最佳打印效果
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Eye className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">实时预览</h3>
                <p className="text-gray-600 leading-relaxed">
                  每个配置步骤都能即时看到效果变化，所见即所得，确保最终成品符合您的期望
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-xl transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Settings className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">专业工艺</h3>
                <p className="text-gray-600 leading-relaxed">
                  提供彩色丝印、烫金烫银、素色压印等多种专业工艺，满足不同的视觉和触感需求
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">准备开始您的定制之旅吗？</h2>
          <p className="text-xl text-gray-300 mb-8">
            首次定制用户可享受定制费减免优惠，现在就开始创造属于您的独特作品
          </p>
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6"
            onClick={() => setShowCustomization(true)}
          >
            立即开始定制 <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
