import * as React from 'react';
import styles from './reviews.module.css';

interface Props {}

const Reviews: React.FC<Props> = () => {
  const [activeOption, setActiveOption] = React.useState<string>('REVIEWS');
  const [activeQuestionForm, setActiveQuestionForm] =
    React.useState<boolean>(false);
  const [activeReviewForm, setActiveReviewForm] =
    React.useState<boolean>(false);

  return (
    <div className={styles.container}>
      <div className={styles.reviewsWrapper}>
        <div className={styles.stars}>
          <div className={styles.average}>
            <span className={styles.ratingTitle}>
              <svg
                className={styles.mobileStar}
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
              </svg>
              <svg
                className={styles.desktopStar}
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
              >
                <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
              </svg>
              4.8
            </span>
            <p className={styles.ratingSubTitle}>Average rating</p>
          </div>

          <section className={styles.barRatings}>
            <div className={styles.barWrapper}>
              <div className={styles.barStars}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                </svg>
              </div>

              <div className={styles.bar}>
                <div className={styles.innerBar}></div>
              </div>
            </div>
            <div className={styles.barWrapper}>
              <div className={styles.barStars}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                </svg>
              </div>

              <div className={styles.bar}>
                <div className={styles.innerBar}></div>
              </div>
            </div>
            <div className={styles.barWrapper}>
              <div className={styles.barStars}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                </svg>
              </div>

              <div className={styles.bar}>
                <div className={styles.innerBar}></div>
              </div>
            </div>
            <div className={styles.barWrapper}>
              <div className={styles.barStars}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                </svg>
              </div>

              <div className={styles.bar}>
                <div className={styles.innerBar}></div>
              </div>
            </div>
            <div className={styles.barWrapper}>
              <div className={styles.barStars}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                </svg>
              </div>

              <div className={styles.bar}>
                <div className={styles.innerBar}></div>
              </div>
            </div>
          </section>
          {/* <div className={styles.reviewsHeader}>
            <h2 className={styles.reviewsIntro}>
              What others think about the product
            </h2>
            <div className={styles.headerAction}>
              <button
                onClick={() => setActiveQuestionForm(!activeQuestionForm)}
              >
                Ask a Question
              </button>
              <button onClick={() => setActiveReviewForm(!activeReviewForm)}>
                Write a Review
              </button>
            </div>
          </div> */}
        </div>

        <section className={styles.userReviews}>
          <div className={styles.options}>
            <span
              className={`${
                activeOption === 'REVIEWS'
                  ? styles.activeOption
                  : styles.inactiveOption
              }`}
              onClick={() => {
                setActiveOption('REVIEWS');
              }}
            >
              Reviews
              <p className={styles.optionActionCount}>1</p>
            </span>
            <span
              className={`${
                activeOption === 'QUESTIONS'
                  ? styles.activeOption
                  : styles.inactiveOption
              }`}
              onClick={() => {
                setActiveOption('QUESTIONS');
              }}
            >
              Questions
              <p className={styles.optionActionCount}>1</p>
            </span>
          </div>
          {activeOption === 'REVIEWS' ? (
            <ul className={styles.reviewsList}>
              <li className={styles.userReview}>
                <div className={styles.userReviewHeader}>
                  <h2 className={styles.userName}>Gabbe</h2>
                  <p className={styles.reviewDate}>
                    {new Date().toDateString()}
                  </p>
                </div>
                <div className={styles.userStars}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
                  </svg>
                  <h2 className={styles.userTitleReview}>AMAZING</h2>
                </div>
                <p className={styles.userTextReview}>really nice</p>
              </li>
            </ul>
          ) : (
            <ul className={styles.reviewsList}>
              <li className={styles.userReview}>
                <div className={styles.userReviewHeader}>
                  <h2 className={styles.userName}>Gabbe</h2>
                  <p className={styles.reviewDate}>
                    {new Date().toDateString()}
                  </p>
                </div>

                <p className={styles.userTextReview}>really nice</p>
                <div className={styles.answerWrapper}>
                  <span className={styles.answerHeader}>
                    <h1>Swedish Delicacies</h1>
                    <p>{new Date().toDateString()}</p>
                  </span>
                  <p className={styles.answer}>Thank you!</p>
                </div>
              </li>
            </ul>
          )}
        </section>
      </div>
      {/* <section className={styles.formWrapper}>
        <form
          action="POST"
          className={`${
            activeQuestionForm ? styles.questionForm : styles.inactiveForm
          }`}
        >
          <div className={styles.nameField}>
            <label>Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              className={styles.nameInput}
            />
          </div>
          <div className={styles.emailField}>
            <label>Email</label>
            <input type="text" placeholder="myemail@exmaple.com" />
          </div>
          <div className={styles.questionField}>
            <label>Question</label>
            <textarea rows={4} placeholder="Write your question here" />
          </div>
          <button className={styles.submitButton}>Submit Question</button>
        </form>
      </section> */}
    </div>
  );
};

export default Reviews;
