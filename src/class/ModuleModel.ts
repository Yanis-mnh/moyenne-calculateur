import type { Note } from "../types/Note";

class ModuleModel {
  private nom: string;
  private coef: number;
  private td: Note;
  private tp: Note;
  private examen: Note;

  private tdChecked: boolean;
  private tpChecked: boolean;
  private examChecked: boolean;

  public coefGlobal: number;
  public average: number | null;

  constructor(
    nom?: string,
    coef?: number,
    td?: Note,
    tp?: Note,
    examen?: Note,
    tdChecked?: boolean,
    tpChecked?: boolean,
    examChecked?: boolean,
    coefGlobal?: number,
    average?: number | null
  ) {
    this.nom = nom ?? "";
    this.coef = coef ?? 0;
    this.td = td ?? { coef: 1, note: 0 };
    this.tp = tp ?? { coef: 1, note: 0 };
    this.examen = examen ?? { coef: 1, note: 0 };

    this.tdChecked = tdChecked ?? false;
    this.tpChecked = tpChecked ?? false;
    this.examChecked = examChecked ?? false;

    this.coefGlobal = coefGlobal ?? 1;
    this.average = average ?? null;
  }

  // Getters and Setters

  getNom(): string {
    return this.nom;
  }

  setNom(nom: string): void {
    this.nom = nom;
  }

  getCoef(): number {
    return this.coef;
  }

  setCoef(coef: number): void {
    this.coef = coef;
  }

  getTd(): Note {
    return this.td;
  }

  setTdNote(tdNote: number): void {
    this.td.note = tdNote;
  }

  setTdCoef(coef: number): void {
    this.td.coef = coef;
  }

  setTpNote(note: number): void {
    this.td.note = note;
  }

  setTpCoef(coef: number): void {
    this.tp.coef = coef;
  }

  setExamenNote(note: number): void {
    this.examen.note = note;
  }
  setExamenCoef(coef: number): void {
    this.examen.coef = coef;
  }

  getTp(): Note {
    return this.tp;
  }

  setTp(tp: Note): void {
    this.tp = tp;
  }
  setTd(td: Note): void {
    this.td = td;
  }

  getExamen(): Note {
    return this.examen;
  }

  setExamen(examen: Note): void {
    this.examen = examen;
  }

  getTdChecked(): boolean {
    return this.tdChecked;
  }

  setTdChecked(value: boolean): void {
    this.tdChecked = value;
  }

  getTpChecked(): boolean {
    return this.tpChecked;
  }

  setTpChecked(value: boolean): void {
    this.tpChecked = value;
  }

  getExamChecked(): boolean {
    return this.examChecked;
  }

  setExamChecked(value: boolean): void {
    this.examChecked = value;
  }

  getCoefGlobal(): number {
    return this.coefGlobal;
  }

  setCoefGlobal(value: number): void {
    this.coefGlobal = value;
  }

  getAverage(): number | null {
    return this.average;
  }

  setAverage(value: number | null): void {
    this.average = value;
  }
}

export default ModuleModel;
