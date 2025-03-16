from flask import Flask, request, jsonify, render_template
import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor

app = Flask(__name__)

# Sample disaster dataset
df = pd.DataFrame({
    'region': ['A', 'B', 'C', 'D', 'E'],
    'population': [10000, 25000, 15000, 20000, 18000],
    'past_cases': [500, 1200, 800, 900, 750],
    'food_demand': [2000, 5000, 3000, 4000, 3500],
    'medical_demand': [500, 1200, 800, 900, 750],
    'shelter_demand': [1500, 3000, 2000, 2500, 2300]
})

# Splitting features & target variables
X = df[['population', 'past_cases']]
y_food = df['food_demand']
y_medical = df['medical_demand']
y_shelter = df['shelter_demand']

# Train-test split
X_train, X_test, y_train_food, y_test_food, y_train_medical, y_test_medical, y_train_shelter, y_test_shelter = train_test_split(
    X, y_food, y_medical, y_shelter, test_size=0.2, random_state=42
)

# Training models
model_food = RandomForestRegressor(n_estimators=100, random_state=42)
model_medical = RandomForestRegressor(n_estimators=100, random_state=42)
model_shelter = RandomForestRegressor(n_estimators=100, random_state=42)

model_food.fit(X_train, y_train_food)
model_medical.fit(X_train, y_train_medical)
model_shelter.fit(X_train, y_train_shelter)

# Home route (renders the webpage)
@app.route('/')
def home():
    return render_template('forecast.html')

# Predict function
@app.route('/predict', methods=['POST'])
def predict():
    try:
        population = int(request.form['population'])
        past_cases = int(request.form['past_cases'])

        input_data = pd.DataFrame([[population, past_cases]], columns=['population', 'past_cases'])
        food_pred = model_food.predict(input_data)[0]
        medical_pred = model_medical.predict(input_data)[0]
        shelter_pred = model_shelter.predict(input_data)[0]

        return render_template('forecast.html', food=int(food_pred), medical=int(medical_pred), shelter=int(shelter_pred))

    except Exception as e:
        return render_template('forecast.html', error=str(e))

if __name__ == '__main__':
    app.run(debug=True)
