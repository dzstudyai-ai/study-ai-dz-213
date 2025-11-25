import React from 'react';

export type Language = 'en' | 'fr' | 'ar';

export type Translation = {
  title: string;
  subtitle: string;
  uploadPdf: string;
  pdfSupportNotice: string;
  dialogTitle: string;
  dialogDescription: string;
  formLabelTitle: string;
  formPlaceholderTitle: string;
  formLabelDomain: string;
  formPlaceholderDomain: string;
  formLabelDescription: string;
  formPlaceholderDescription: string;
  formLabelEmail: string;
  formPlaceholderEmail: string;
  formLabelFile: string;
  saveDocument: string;
  invalidFileType: string;
  pleaseUploadPdf: string;
  missingInfo: string;
  provideTitleAndFile: string;
  uploadSuccess: string;
  fileQueued: string;
  uploading?: string;
  pleaseWait?: string;
  uploadFailed?: string;
  tryAgain?: string;
  filesSelected: string;
  removeFile: string;
};

export const translations: Record<Language, Translation> = {
  en: {
    title: 'StudyAI DZ',
    subtitle: 'Your personal AI study assistant. Upload documents to begin.',
    uploadPdf: 'Upload Documents',
    pdfSupportNotice: 'Supports PDF, DOCX, Excel, and PowerPoint files up to 10MB each.',
    dialogTitle: 'Upload Documents',
    dialogDescription: 'Fill in the details below to add your documents to the library.',
    formLabelTitle: 'Title',
    formPlaceholderTitle: 'e.g. Introduction to AI',
    formLabelDomain: 'Domain',
    formPlaceholderDomain: 'e.g. Computer Science',
    formLabelDescription: 'Description',
    formPlaceholderDescription: 'A brief summary of the documents.',
    formLabelEmail: 'Email',
    formPlaceholderEmail: 'e.g. user@example.com',
    formLabelFile: 'Files',
    saveDocument: 'Upload Documents',
    invalidFileType: "Invalid File Type",
    pleaseUploadPdf: "Please upload PDF, DOCX, Excel, or PowerPoint files only.",
    missingInfo: "Missing Information",
    provideTitleAndFile: "Please provide a title, email, and select at least one file.",
    uploadSuccess: "Upload Successful",
    fileQueued: "file(s) uploaded successfully.",
    uploading: "Uploading...",
    pleaseWait: "Please wait while we upload your documents.",
    uploadFailed: "Upload Failed",
    tryAgain: "Please try again.",
    filesSelected: "file(s) selected",
    removeFile: "Remove",
  },
  fr: {
    title: 'StudyAI DZ',
    subtitle: 'Votre assistant d\'étude personnel IA. Téléchargez des documents pour commencer.',
    uploadPdf: 'Télécharger des documents',
    pdfSupportNotice: 'Prend en charge les fichiers PDF, DOCX, Excel et PowerPoint jusqu\'à 10 Mo chacun.',
    dialogTitle: 'Télécharger des documents',
    dialogDescription: 'Remplissez les détails ci-dessous pour ajouter vos documents à la bibliothèque.',
    formLabelTitle: 'Titre',
    formPlaceholderTitle: 'ex. Introduction à l\'IA',
    formLabelDomain: 'Domaine',
    formPlaceholderDomain: 'ex. Informatique',
    formLabelDescription: 'La description',
    formPlaceholderDescription: 'Un bref résumé des documents.',
    formLabelEmail: 'E-mail',
    formPlaceholderEmail: 'ex. utilisateur@example.com',
    formLabelFile: 'Fichiers',
    saveDocument: 'Télécharger des documents',
    invalidFileType: "Type de fichier invalide",
    pleaseUploadPdf: "Veuillez télécharger uniquement des fichiers PDF, DOCX, Excel ou PowerPoint.",
    missingInfo: "Information manquante",
    provideTitleAndFile: "Veuillez fournir un titre, un e-mail et sélectionner au moins un fichier.",
    uploadSuccess: "Téléchargement réussi",
    fileQueued: "fichier(s) téléchargé(s) avec succès.",
    uploading: "Téléchargement en cours...",
    pleaseWait: "Veuillez patienter pendant que nous téléchargeons vos documents.",
    uploadFailed: "Échec du téléchargement",
    tryAgain: "Veuillez réessayer.",
    filesSelected: "fichier(s) sélectionné(s)",
    removeFile: "Retirer",
  },
  ar: {
    title: 'StudyAI DZ',
    subtitle: 'مساعدك الدراسي الشخصي بالذكاء الاصطناعي. قم بتحميل المستندات للبدء.',
    uploadPdf: 'تحميل المستندات',
    pdfSupportNotice: 'يدعم ملفات PDF و DOCX و Excel و PowerPoint حتى 10 ميجابايت لكل منها.',
    dialogTitle: 'تحميل المستندات',
    dialogDescription: 'املأ التفاصيل أدناه لإضافة مستنداتك إلى المكتبة.',
    formLabelTitle: 'عنوان',
    formPlaceholderTitle: 'على سبيل المثال مقدمة في الذكاء الاصطناعي',
    formLabelDomain: 'المجال',
    formPlaceholderDomain: 'على سبيل المثال علوم الحاسوب',
    formLabelDescription: 'وصف',
    formPlaceholderDescription: 'ملخص موجز للمستندات.',
    formLabelEmail: 'بريد إلكتروني',
    formPlaceholderEmail: 'مثال user@example.com',
    formLabelFile: 'الملفات',
    saveDocument: 'تحميل المستندات',
    invalidFileType: "نوع ملف غير صالح",
    pleaseUploadPdf: "الرجاء تحميل ملفات PDF أو DOCX أو Excel أو PowerPoint فقط.",
    missingInfo: "معلومات ناقصة",
    provideTitleAndFile: "يرجى تقديم عنوان وبريد إلكتروني وتحديد ملف واحد على الأقل.",
    uploadSuccess: "اكتمل التحميل",
    fileQueued: "تم تحميل الملف (الملفات) بنجاح.",
    uploading: "جاري التحميل...",
    pleaseWait: "يرجى الانتظار بينما نقوم بتحميل مستنداتك.",
    uploadFailed: "فشل التحميل",
    tryAgain: "يرجى المحاولة مرة أخرى.",
    filesSelected: "ملف (ملفات) محدد",
    removeFile: "إزالة",
  },
};

export interface LanguageContextType {
  language: Language;
  switchLanguage: (language: Language) => void;
}
