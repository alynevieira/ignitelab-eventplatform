import { Link, useNavigate, useParams } from 'react-router-dom';

import { CheckCircle, Diamond, Lock } from 'phosphor-react';
import { format, isPast } from 'date-fns';
import classNames from 'classnames';

import ptBR from 'date-fns/locale/pt-BR';
import { useEffect } from 'react';

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: 'live' | 'class';
}

export function Lesson(props: LessonProps) {
  let { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const isLessonAvailable = isPast(props.availableAt);
  const availableDateFormatted = format(props.availableAt, "EEE' • 'd' de 'MMMM' • 'k'h'mm", {
    locale: ptBR,
  });
  
  useEffect(() => {
    if(!slug && isLessonAvailable) {
      const slugSaved = localStorage.getItem('slug')!;
      navigate(`/event/lesson/${slugSaved}`);
      slug = slugSaved;
    }
  }, []);
  
  const routeToLesson = isLessonAvailable ? `/event/lesson/${props.slug}` : '';
  const isActiveLesson = slug === props.slug;

  return (
    <Link to={routeToLesson} className='group'>
      <span className="text-gray-300 capitalize">
        {availableDateFormatted}
      </span>

      <div 
        className={classNames('relative rounded border border-gray-500 p-4 mt-2', {
          'bg-green-500': isActiveLesson,
          'group-hover:border-green-500': isLessonAvailable,
          'opacity-50 cursor-not-allowed': !isLessonAvailable
        })}>
          
        <header className="flex items-center justify-between">
          
          {isLessonAvailable ? (
            <span className={classNames("text-sm font-medium flex items-center gap-2", {
              'text-white': isActiveLesson,
              'text-blue-500': !isActiveLesson
            })}>
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} />
              Em breve
            </span>
          )}

          <span className={classNames("text-xs rounded px-2 py-[0.125rem] text-white border font-bold", {
            'border-white': isActiveLesson,
            'border-green-300': !isActiveLesson
            })}>
            {props.type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
          </span>
        </header>

        { isActiveLesson 
          ? <Diamond size={16} color="#00875F" weight="fill" className="absolute left-[-.5rem]"/> 
          : ""}

        <strong className={classNames('mt-4 block',{
          'text-white': isActiveLesson,
          'text-gray-200': !isActiveLesson
          })}>
          {props.title}
        </strong>
      </div>
    </Link>
  )
}