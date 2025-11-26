
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getTranslations } from '@/lib/translations';
import type { Language, Medicine } from '@/types';
import { generateMedicineDetails } from '@/ai/flows/generate-medicine-details';
import { fetchMedicineByName } from '@/lib/mockApi';
import { MedicineCard } from '@/components/medisearch/MedicineCard';
import { Loader2, AlertCircle, Home } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

function ResultsDisplay() {
  const searchParams = useSearchParams();
  const medicineNamesParam = searchParams.get('medicines');
  const langParam = (searchParams.get('lang') as Language) || 'en';

  const [t, setT] = useState(() => getTranslations(langParam));
  const [results, setResults] = useState<Medicine[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setT(getTranslations(langParam));
  }, [langParam]);

  useEffect(() => {
    const processMedicines = async () => {
      setIsLoading(true);
      setError(null);
      if (!medicineNamesParam) {
        setError('No medicine names provided in the search query.');
        setIsLoading(false);
        return;
      }

      try {
        const medicineNames = JSON.parse(medicineNamesParam);
        if (!Array.isArray(medicineNames) || medicineNames.length === 0) {
          setResults([]);
          setIsLoading(false);
          return;
        }

        const allMedicineDetails: Medicine[] = await Promise.all(
          medicineNames.map(async (name: string) => {
            const dbData = await fetchMedicineByName(name);
            if (dbData.length > 0) {
              const dbItem = dbData[0];
              const aiDetails = await generateMedicineDetails({
                searchTermOrName: dbItem.drugName,
                language: langParam,
                contextDrugCode: dbItem.drugCode,
                contextDrugName: dbItem.drugName,
                contextSaltName: dbItem.saltName,
                contextDrugCategory: dbItem.drugCategory,
                contextDrugGroup: dbItem.drugGroup,
                contextDrugType: dbItem.drugType,
                contextHsnCode: dbItem.hsnCode,
                contextSearchKey: dbItem.searchKey,
                contextMrp: dbItem.mrp,
                contextUom: dbItem.uom,
              });
              return { ...dbItem, ...aiDetails };
            } else {
              // Not found in DB, generate from AI
              return generateMedicineDetails({
                searchTermOrName: name,
                language: langParam,
              });
            }
          })
        );
        setResults(allMedicineDetails);
      } catch (e: any) {
        console.error('Error processing medicine results:', e);
        setError('Failed to parse or fetch medicine details.');
      } finally {
        setIsLoading(false);
      }
    };

    processMedicines();
  }, [medicineNamesParam, langParam]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8">
       <header className="w-full max-w-5xl mb-8 flex justify-between items-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary">
            Prescription Analysis Results
        </h1>
        <Button variant="outline" asChild>
          <Link href="/">
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </header>

      {isLoading && (
        <div className="flex flex-col items-center space-y-2 p-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-lg text-muted-foreground">Analyzing prescription and fetching details...</p>
        </div>
      )}

      {error && !isLoading && (
        <Alert variant="destructive" className="w-full max-w-lg">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {!isLoading && !error && results.length === 0 && (
        <Alert className="w-full max-w-lg">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle>No Medicines Found</AlertTitle>
          <AlertDescription>Could not identify any medicines from the uploaded image.</AlertDescription>
        </Alert>
      )}

      {!isLoading && !error && results.length > 0 && (
        <main className="w-full grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {results.map((medicine) => (
            <MedicineCard key={medicine.drugCode || medicine.drugName} medicine={medicine} t={t} />
          ))}
        </main>
      )}
       <footer className="mt-auto pt-12 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} {t.appName}. {t.allRightsReserved}</p>
      </footer>
    </div>
  );
}


export default function ResultsPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>}>
            <ResultsDisplay />
        </Suspense>
    )
}
