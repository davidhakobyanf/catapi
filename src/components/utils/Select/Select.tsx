import styles from './Select.module.css';

interface SelectProps {
    options: number[];
    limit: number;
    text: string;
    setLimit: (value: number) => void;
}
const Select: React.FC<SelectProps> = ({ options, limit, setLimit, text }) => {
    return (
        <div className={styles.selectContainer}>
            {text}
            <select className={styles.select} value={limit} onChange={(e) => setLimit(Number(e.target.value))}>
                {options.map((opt: number) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    );
};
export default Select;
