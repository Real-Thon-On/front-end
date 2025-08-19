import clsx from 'clsx';

import { Default } from '@/components/layout/container/container';
import { MindTestQuestion } from '@/service/interfaces';
import styles from '@styles/inputRadio.module.css';

export default function Question({ params }: { params: MindTestQuestion }) {
  const { questionText, choices } = params;

  return (
    <div>
      <div className="flex body1 px-[.8rem] py-[1.6rem] bg-[var(--gray1)] rounded-t-[1.2rem] break-keep">
        <div>{`${params.id}. `}</div>{' '}
        <span className="ml-[.6rem]">{questionText.replace(`${params.id}. `, '')}</span>
      </div>
      <Default className="flex-col !rounded-t-none">
        {choices.map(({ id, text }, index) => (
          <div
            key={id}
            className={`flex items-center px-[1.6rem] py-[.5rem] ${
              index === choices.length - 1 ? 'rounded-b-[1.2rem]' : ''
            }`}
          >
            <label
              htmlFor={`choice-${id}`}
              className={clsx('body1', styles.label)}
            >
              <input
                type="radio"
                id={`choice-${id}`}
                name={`question-${params.id}`}
                value={id}
                className={clsx(styles.genderInput)}
                required
              />
              <div className={clsx(styles.img, '!w-[1.8rem] !h-[1.8rem]')}></div>
              <span className="ml-[.8rem]">{text}</span>
            </label>
          </div>
        ))}
      </Default>
    </div>
  );
}
