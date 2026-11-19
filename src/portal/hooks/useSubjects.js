import { useEffect, useState } from "react";
import { readLocalRecord, writeLocalRecord } from "../services/api";
import { getSelectionStorageKey, initialSelections } from "../services/subjectService";

export function useSubjects(studentId) {
  const storageKey = getSelectionStorageKey(studentId);
  const [selections, setSelections] = useState(() =>
    readLocalRecord(storageKey, initialSelections),
  );

  useEffect(() => {
    writeLocalRecord(storageKey, selections);
  }, [selections, storageKey]);

  return { selections, setSelections };
}
