from flask import Flask, render_template, request, redirect, url_for, session

app = Flask(__name__)

app.secret_key = "shushanik-secret-key"

choice_points = {
    "faith": 3,
    "dignity": 2,
    "freedom": 1,
    "peace": 0,
    "ans1": 3,
    "ans2": 2,
    "ans3": 1,
    "ans4": 0,

}

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/introduction")
def introduction():
    return render_template("introduction.html")


@app.route("/choice", methods=["GET", "POST"])
def choice():

    if request.method == "GET":
        return render_template("choice.html")
    
    selected_choice = request.form["choice"]
    points = choice_points[selected_choice]
    session["score"] = points
    return redirect(url_for("question2"))

@app.route("/question2", methods=["GET", "POST"])
def question2():
    
    if request.method == "GET":
        return render_template("question2.html")
    
    selected_choice = request.form["choice"]
    points = choice_points[selected_choice]
    session["score"] += points
    return redirect(url_for("question3"))

@app.route("/question3", methods=["GET", "POST"])
def question3():
    
    if request.method == "GET":
        return render_template("question3.html")
    
    selected_choice = request.form["choice"]
    points = choice_points[selected_choice]
    session["score"] += points
    return redirect(url_for("question4"))

@app.route("/question4", methods=["GET", "POST"])
def question4():
    
    if request.method == "GET":
        return render_template("question4.html")
    
    selected_choice = request.form["choice"]
    points = choice_points[selected_choice]
    session["score"] += points
    return redirect(url_for("question5"))

@app.route("/question5", methods=["GET", "POST"])
def question5():
    
    if request.method == "GET":
        return render_template("question5.html")
    
    selected_choice = request.form["choice"]
    points = choice_points[selected_choice]
    session["score"] += points
    return redirect(url_for("results"))

@app.route("/results")
def results():

    total_score = session.get("score", 0)

    percentage = (total_score / 15) * 100

    return render_template(
        "results.html",
        percentage=percentage
    )

@app.route("/scale")
def scale():
    return render_template("scale.html")


@app.route("/characters")
def characters():
    return render_template("characters.html")

if __name__ == "__main__":
    app.run(debug=True)