"use client";

import { useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { GraduationCap, FileUp, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { LanguageSwitcher, useLanguage } from '@/components/language-switcher';
import { ModeToggle } from '@/components/mode-toggle';
import { translations } from '@/lib/translations';
import { supabase } from '@/lib/supabase';


// Supported file types
const SUPPORTED_MIME_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
  'application/msword', // .doc
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
  'application/vnd.ms-excel', // .xls
  'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
  'application/vnd.ms-powerpoint', // .ppt
];

const ACCEPT_STRING = '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx';

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [domain, setDomain] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const { language } = useLanguage();
  const t = translations[language];

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);

    // Validate file types
    const invalidFiles = selectedFiles.filter(
      file => !SUPPORTED_MIME_TYPES.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      toast({
        variant: "destructive",
        title: t.invalidFileType,
        description: t.pleaseUploadPdf,
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    // Add files to existing list
    setFiles(prev => [...prev, ...selectedFiles]);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!title || files.length === 0 || !email) {
      toast({
        variant: "destructive",
        title: t.missingInfo,
        description: t.provideTitleAndFile,
      });
      return;
    }

    try {
      // Show loading toast
      toast({
        title: t.uploading || "Uploading...",
        description: t.pleaseWait || "Please wait while we upload your documents.",
      });

      let uploadedCount = 0;
      let failedCount = 0;

      // Upload each file
      for (const file of files) {
        try {
          // 1. Upload file to Supabase Storage
          const fileExt = file.name.split('.').pop();
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
          const filePath = `${fileName}`;

          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('documents')
            .upload(filePath, file, {
              cacheControl: '3600',
              upsert: false
            });

          if (uploadError) {
            throw new Error(`Upload failed: ${uploadError.message}`);
          }

          // 2. Save document metadata to database
          const { data: dbData, error: dbError } = await supabase
            .from('documents')
            .insert([
              {
                title,
                domain: domain || null,
                description: description || null,
                email,
                file_name: file.name,
                file_path: filePath,
                file_size: file.size,
              }
            ])
            .select();

          if (dbError) {
            // If database insert fails, try to delete the uploaded file
            await supabase.storage.from('documents').remove([filePath]);
            throw new Error(`Database error: ${dbError.message}`);
          }

          uploadedCount++;
        } catch (error: any) {
          console.error(`Failed to upload ${file.name}:`, error);
          failedCount++;
        }
      }

      // Show result
      if (uploadedCount > 0) {
        toast({
          title: t.uploadSuccess,
          description: `${uploadedCount} ${t.fileQueued}`,
        });
      }

      if (failedCount > 0) {
        toast({
          variant: "destructive",
          title: t.uploadFailed || "Upload Failed",
          description: `${failedCount} file(s) failed to upload.`,
        });
      }

      // Reset form and close dialog if all succeeded
      if (failedCount === 0) {
        setTitle('');
        setDomain('');
        setDescription('');
        setEmail('');
        setFiles([]);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setOpen(false);
      }

    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        variant: "destructive",
        title: t.uploadFailed || "Upload Failed",
        description: error.message || t.tryAgain || "Please try again.",
      });
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-background">
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <LanguageSwitcher />
        <ModeToggle />
      </div>
      <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden p-4">
        <div className="absolute inset-0 w-full h-full bg-primary/5 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]"></div>
        <Card className="w-full max-w-md shadow-2xl z-10 bg-card/80 backdrop-blur-sm border-primary/10">
          <CardHeader className="text-center p-8">
            <div className="mx-auto flex items-center justify-center bg-primary text-primary-foreground rounded-full h-20 w-20 mb-6 border-4 border-background shadow-lg">
              <GraduationCap className="h-10 w-10" />
            </div>
            <CardTitle className="text-4xl font-headline font-extrabold text-foreground">
              {t.title}
            </CardTitle>
            <CardDescription className="pt-2 text-md text-muted-foreground">
              {t.subtitle}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button
                  className="w-full text-lg py-7 rounded-lg shadow-lg hover:shadow-primary/30 transition-all duration-300"
                  size="lg"
                >
                  <FileUp className="mr-3 h-6 w-6" />
                  {t.uploadPdf}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{t.dialogTitle}</DialogTitle>
                  <DialogDescription>
                    {t.dialogDescription}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      {t.formLabelTitle}
                    </Label>
                    <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" placeholder={t.formPlaceholderTitle} />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="domain" className="text-right">
                      {t.formLabelDomain}
                    </Label>
                    <Input id="domain" value={domain} onChange={(e) => setDomain(e.target.value)} className="col-span-3" placeholder={t.formPlaceholderDomain} />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      {t.formLabelDescription}
                    </Label>
                    <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="col-span-3" placeholder={t.formPlaceholderDescription} />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      {t.formLabelEmail}
                    </Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="col-span-3" placeholder={t.formPlaceholderEmail} />
                  </div>

                  {/* File Upload Section - Full Width */}
                  <div className="space-y-3 pt-2">
                    <Label htmlFor="file" className="text-base font-semibold">
                      {t.formLabelFile}
                    </Label>
                    <Input
                      id="file"
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="w-full cursor-pointer"
                      accept={ACCEPT_STRING}
                      multiple
                    />
                    {files.length > 0 && (
                      <div className="text-sm text-muted-foreground">
                        {files.length} {t.filesSelected}
                      </div>
                    )}

                    {/* File list - Wrapping grid */}
                    {files.length > 0 && (
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-2">
                          {files.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg border border-border hover:bg-muted/80 transition-colors"
                            >
                              <span className="text-sm font-medium">{file.name}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(index)}
                                className="h-5 w-5 p-0 hover:bg-destructive/20 rounded-full"
                              >
                                <X className="h-3 w-3" />
                                <span className="sr-only">{t.removeFile}</span>
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleSubmit}>{t.saveDocument}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <p className="text-xs text-muted-foreground pt-2 text-center">
              {t.pdfSupportNotice}
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
