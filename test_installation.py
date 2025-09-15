# Test if everything is installed correctly
print("Testing Python libraries...")

try:
    import pyspark
    print("✅ PySpark installed successfully")
    print(f"PySpark version: {pyspark.__version__}")
except:
    print("❌ PySpark not installed")

try:
    import pandas
    print("✅ Pandas installed successfully")
except:
    print("❌ Pandas not installed")

try:
    import yfinance
    print("✅ YFinance installed successfully")
except:
    print("❌ YFinance not installed")

try:
    import flask
    print("✅ Flask installed successfully")
except:
    print("❌ Flask not installed")

# Test Spark
try:
    from pyspark.sql import SparkSession
    spark = SparkSession.builder.appName("Test").getOrCreate()
    print("✅ Spark session created successfully")
    print(f"Spark version: {spark.version}")
    spark.stop()
except Exception as e:
    print(f"❌ Spark error: {e}")

print("Installation test complete!")