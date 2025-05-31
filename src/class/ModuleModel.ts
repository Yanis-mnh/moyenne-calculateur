import type { Note } from "../types/Note";

class ModuleModel {
  private nom: string;
  private coef: number;
  private td: Note;
  private tp: Note;
  private examen: Note;

  constructor();
  constructor(
    nom?: string,
    coef?: number,
    td?: Note,
    tp?: Note,
    examen?: Note
  ) {
    this.nom = nom ?? "";
    this.coef = coef ?? 0;
    this.td = td ?? { coef: 1, note: 1 };
    this.tp = tp ?? { coef: 1, note: 1 };
    this.examen = examen ?? { coef: 1, note: 1 };
  }

  // Getter and Setter for nom
  getNom(): string {
    return this.nom;
  }

  setNom(nom: string): void {
    this.nom = nom;
  }

  // Getter and Setter for coef
  getCoef(): number {
    return this.coef;
  }

  setCoef(coef: number): void {
    this.coef = coef;
  }

  // Getter and Setter for td
  getTd(): Note {
    return this.td;
  }

  setTd(td: Note): void {
    this.td = td;
  }

  // Getter and Setter for tp
  getTp(): Note {
    return this.tp;
  }

  setTp(tp: Note): void {
    this.tp = tp;
  }

  // Getter and Setter for examen
  getExamen(): Note {
    return this.examen;
  }

  setExamen(examen: Note): void {
    this.examen = examen;
  }
}

export default ModuleModel;
