import { useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import { Upload, FileSpreadsheet, ImageIcon, CheckCircle2, AlertCircle, Loader } from 'lucide-react';

type Status = 'ready' | 'processing' | 'success' | 'error';

export function AdminBulkUploadPage() {
  const { showToast } = useApp();
  const [status, setStatus] = useState<Status>('ready');
  const [progress, setProgress] = useState(0);

  const handleUpload = () => {
    setStatus('processing');
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setStatus('success');
          showToast({ title: 'Upload complete', message: '12 products imported successfully. 0 errors.', variant: 'success' });
          return 100;
        }
        return p + 10;
      });
    }, 200);
  };

  const reset = () => {
    setStatus('ready');
    setProgress(0);
  };

  const previewData = [
    { name: 'Aria Diamond Ring', category: 'Rings', visibility: 'Public', images: 4 },
    { name: 'Saffire Pendant', category: 'Necklaces', visibility: 'Members Only', images: 3 },
    { name: 'Velvet Gold Bangles', category: 'Bangles', visibility: 'Public', images: 5 },
    { name: 'Noor Bridal Set', category: 'Bridal', visibility: 'Premium', images: 6 },
    { name: 'Étoile Stud Earrings', category: 'Earrings', visibility: 'Public', images: 3 },
  ];

  return (
    <AdminLayout title="Bulk Upload">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-charcoal-800">Upload Catalogue</h1>
        <p className="mt-2 text-sm text-charcoal-400 font-light">Import multiple products at once using a CSV or Excel file and an image folder.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CSV Upload */}
        <div className="bg-ivory-100 border border-ivory-300 p-8">
          <div className="flex items-center gap-3 mb-6">
            <FileSpreadsheet size={20} strokeWidth={1.5} className="text-charcoal-600" />
            <h2 className="font-serif text-xl text-charcoal-800">Product Data</h2>
          </div>

          <div
            className={`border-2 border-dashed p-10 text-center transition-colors duration-300 ${
              status === 'success' ? 'border-accent-success/40 bg-accent-success/5' : 'border-charcoal-200 hover:border-charcoal-300'
            }`}
          >
            {status === 'ready' && (
              <>
                <Upload size={28} strokeWidth={1} className="text-charcoal-300 mx-auto mb-4" />
                <p className="text-sm text-charcoal-500 font-light">Drag & drop your CSV or Excel file here</p>
                <p className="text-xs text-charcoal-400 font-light mt-1">or click to browse</p>
                <div className="mt-6">
                  <Button variant="secondary" size="sm" onClick={handleUpload}>Browse Files</Button>
                </div>
              </>
            )}

            {status === 'processing' && (
              <div>
                <Loader size={28} strokeWidth={1} className="text-charcoal-500 mx-auto mb-4 animate-spin" />
                <p className="text-sm text-charcoal-600 font-light">Processing… {progress}%</p>
                <div className="mt-4 h-1 bg-ivory-300 rounded-full overflow-hidden">
                  <div className="h-full bg-charcoal-800 transition-all duration-200" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}

            {status === 'success' && (
              <div>
                <CheckCircle2 size={28} strokeWidth={1.5} className="text-accent-success mx-auto mb-4" />
                <p className="text-sm text-charcoal-700 font-medium">products_catalogue.csv</p>
                <p className="text-xs text-accent-success font-light mt-1">12 products imported successfully</p>
                <button onClick={reset} className="mt-4 text-xs uppercase tracking-[0.15em] text-charcoal-400 hover:text-charcoal-700 transition-colors">
                  Upload another file
                </button>
              </div>
            )}
          </div>

          <p className="mt-4 text-xs text-charcoal-400 font-light">Supported formats: .csv, .xlsx, .xls</p>
        </div>

        {/* Image Upload */}
        <div className="bg-ivory-100 border border-ivory-300 p-8">
          <div className="flex items-center gap-3 mb-6">
            <ImageIcon size={20} strokeWidth={1.5} className="text-charcoal-600" />
            <h2 className="font-serif text-xl text-charcoal-800">Image Folder</h2>
          </div>

          <div className="border-2 border-dashed border-charcoal-200 hover:border-charcoal-300 p-10 text-center transition-colors duration-300">
            <Upload size={28} strokeWidth={1} className="text-charcoal-300 mx-auto mb-4" />
            <p className="text-sm text-charcoal-500 font-light">Drag & drop your image folder here</p>
            <p className="text-xs text-charcoal-400 font-light mt-1">or click to browse</p>
            <div className="mt-6">
              <Button variant="secondary" size="sm">Browse Folder</Button>
            </div>
          </div>

          <p className="mt-4 text-xs text-charcoal-400 font-light">Supported formats: .jpg, .png, .webp · Max 5MB per image</p>
        </div>
      </div>

      {/* Preview */}
      {status === 'success' && (
        <div className="mt-8 bg-ivory-100 border border-ivory-300 overflow-x-auto animate-fade-in">
          <div className="px-6 py-4 border-b border-ivory-300">
            <h3 className="font-serif text-lg text-charcoal-800">Import Preview</h3>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-ivory-300">
                <th className="text-left text-[0.65rem] uppercase tracking-[0.15em] text-charcoal-400 font-medium px-6 py-3">Product Name</th>
                <th className="text-left text-[0.65rem] uppercase tracking-[0.15em] text-charcoal-400 font-medium px-6 py-3">Category</th>
                <th className="text-left text-[0.65rem] uppercase tracking-[0.15em] text-charcoal-400 font-medium px-6 py-3">Visibility</th>
                <th className="text-left text-[0.65rem] uppercase tracking-[0.15em] text-charcoal-400 font-medium px-6 py-3">Images</th>
                <th className="text-left text-[0.65rem] uppercase tracking-[0.15em] text-charcoal-400 font-medium px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {previewData.map((row, i) => (
                <tr key={i} className="border-b border-ivory-300 last:border-0">
                  <td className="px-6 py-3 text-sm text-charcoal-700 font-light">{row.name}</td>
                  <td className="px-6 py-3 text-sm text-charcoal-500 font-light">{row.category}</td>
                  <td className="px-6 py-3 text-sm text-charcoal-500 font-light">{row.visibility}</td>
                  <td className="px-6 py-3 text-sm text-charcoal-500 font-light">{row.images}</td>
                  <td className="px-6 py-3">
                    <span className="inline-flex items-center gap-1.5 text-xs text-accent-success">
                      <CheckCircle2 size={14} strokeWidth={1.5} /> Imported
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
