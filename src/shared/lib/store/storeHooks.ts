import { useDispatch } from "react-redux";
import { AppDispatch } from "./types"; // Импортируйте типы из нового файла

export const useAppDispatch = () => useDispatch<AppDispatch>();